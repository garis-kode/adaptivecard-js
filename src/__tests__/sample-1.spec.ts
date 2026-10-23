// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { test, expect } from "bun:test";
import {
    AdaptiveCard,
    ActionSet,
    Column,
    ColumnSet,
    Container,
    HorizontalAlignment,
    Icon,
    IconSize,
    Image,
    ImageStyle,
    OpenUrlAction,
    RichTextBlock,
    SizeAndUnit,
    SizeUnit,
    Spacing,
    Table,
    TableCell,
    TableColumnDefinition,
    TableRow,
    TextBlock,
    TextColor,
    TextRun,
    TextSize,
    TextWeight,
    ToggleVisibilityAction,
    VerticalAlignment,
    Versions
} from "../index";

const AVATAR_SMALL =
    "https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/account/assets/avatar_small.png";
const AVATAR_LARGE =
    "https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/account/assets/avatar_large.png";

// The See more / See less toggles and both chevron pairs all flip the same set of
// elements, in this exact order (array order is asserted by toEqual).
const TOGGLE_TARGETS = [
    "showMore1",
    "showLess1",
    "showMore2",
    "showLess2",
    "chevronDown1",
    "chevronUp1",
    "chevronDown2",
    "chevronUp2",
    "moreText"
];

// A fresh ToggleVisibility action per use (elements can't share a parented instance).
function toggle(): ToggleVisibilityAction {
    const action = new ToggleVisibilityAction();
    for (const id of TOGGLE_TARGETS) {
        action.addTargetElement(id);
    }
    return action;
}

function tb(text: string, props: Record<string, unknown> = {}): TextBlock {
    return Object.assign(new TextBlock(text), props);
}

// The "Reta Taylor" owner block (avatar + name), rebuilt per call so each parent
// gets its own instance.
function ownerColumnSet(spacing?: Spacing): ColumnSet {
    const columnSet = new ColumnSet();
    if (spacing !== undefined) {
        columnSet.spacing = spacing;
    }

    const avatarColumn = new Column("auto");
    avatarColumn.verticalContentAlignment = VerticalAlignment.Center;
    avatarColumn.addItem(Object.assign(new Image(AVATAR_SMALL), { pixelWidth: 20 }));

    const nameColumn = new Column("stretch");
    nameColumn.spacing = Spacing.Small;
    nameColumn.verticalContentAlignment = VerticalAlignment.Center;
    nameColumn.addItem(tb("Reta Taylor", { wrap: true }));

    columnSet.addColumn(avatarColumn);
    columnSet.addColumn(nameColumn);
    return columnSet;
}

// A "See more" / "See less" RichTextBlock whose single run toggles visibility.
function seeToggle(id: string, text: string, isVisible?: boolean): RichTextBlock {
    const richText = new RichTextBlock();
    richText.id = id;
    if (isVisible !== undefined) {
        richText.isVisible = isVisible;
    }

    const run = new TextRun(text);
    run.selectAction = toggle();
    richText.addInline(run);
    return richText;
}

function chevron(id: string, name: string, isVisible?: boolean): Icon {
    const icon = new Icon(name);
    icon.id = id;
    if (isVisible !== undefined) {
        icon.isVisible = isVisible;
    }
    icon.size = IconSize.xxSmall;
    icon.color = TextColor.Accent;
    icon.selectAction = toggle();
    return icon;
}

test("sample-1 builds the Fourth Coffee opportunity card", () => {
    const card = new AdaptiveCard();
    card.version = Versions.v1_6;

    // --- body[0]: header ColumnSet (title / Status / Opportunity Score) ---
    const header = new ColumnSet();

    const titleColumn = new Column("stretch");
    titleColumn.verticalContentAlignment = VerticalAlignment.Center;
    titleColumn.addItem(
        tb("Fourth Coffee Distillery Equipment ", {
            size: TextSize.Large,
            weight: TextWeight.Bolder,
            wrap: true
        })
    );

    const statusColumn = new Column("auto");
    statusColumn.targetWidth = "AtLeast:Standard";
    statusColumn.spacing = Spacing.Small;
    statusColumn.addItem(
        tb("Status", {
            wrap: true,
            size: TextSize.Small,
            weight: TextWeight.Default,
            isSubtle: true
        })
    );
    statusColumn.addItem(
        tb("In Progress", {
            color: TextColor.Good,
            spacing: Spacing.None,
            size: TextSize.Small,
            weight: TextWeight.Bolder,
            wrap: true
        })
    );

    const scoreColumn = new Column("auto");
    scoreColumn.targetWidth = "AtLeast:Standard";
    scoreColumn.separator = true;
    scoreColumn.addItem(
        tb("Opportunity Score", {
            size: TextSize.Small,
            weight: TextWeight.Default,
            isSubtle: true,
            wrap: true
        })
    );
    scoreColumn.addItem(
        tb("91 - Grade A", {
            wrap: true,
            weight: TextWeight.Bolder,
            spacing: Spacing.None,
            size: TextSize.Small,
            color: TextColor.Default
        })
    );

    header.addColumn(titleColumn);
    header.addColumn(statusColumn);
    header.addColumn(scoreColumn);
    card.addItem(header);

    // --- body[1..3]: narrow-only status / score text ---
    card.addItem(tb("Opportunity", { wrap: true, isSubtle: true, spacing: Spacing.None }));

    const narrowStatus = tb("In Progress", {
        color: TextColor.Good,
        weight: TextWeight.Bolder,
        wrap: true
    });
    narrowStatus.targetWidth = "AtMost:Narrow";
    card.addItem(narrowStatus);

    const narrowScore = tb("91 - Grade A", {
        wrap: true,
        weight: TextWeight.Bolder,
        spacing: Spacing.None,
        color: TextColor.Default
    });
    narrowScore.targetWidth = "AtMost:Narrow";
    card.addItem(narrowScore);

    // --- body[4]: narrow Table (Account / Est. Revenue / Owner) ---
    const table = new Table();
    table.targetWidth = "Narrow";
    table.firstRowAsHeaders = false;
    table.showGridLines = false;
    table.spacing = Spacing.Large;
    table.separator = true;

    const tableColumn2 = new TableColumnDefinition();
    tableColumn2.width = new SizeAndUnit(2, SizeUnit.Weight);
    const tableColumn3 = new TableColumnDefinition();
    tableColumn3.width = new SizeAndUnit(3, SizeUnit.Weight);
    table.addColumn(tableColumn2);
    table.addColumn(tableColumn3);

    const makeTextRow = (label: string, value: string): TableRow => {
        const row = new TableRow();
        row.verticalCellContentAlignment = VerticalAlignment.Center;

        const labelCell = new TableCell();
        labelCell.addItem(tb(label, { wrap: true, isSubtle: true }));
        const valueCell = new TableCell();
        valueCell.addItem(tb(value, { wrap: true }));

        row.addCell(labelCell);
        row.addCell(valueCell);
        return row;
    };

    table.addRow(makeTextRow("Account", "Fourth Coffee"));
    table.addRow(makeTextRow("Est. Revenue", "$3,000,000.00"));

    const ownerRow = new TableRow();
    ownerRow.verticalCellContentAlignment = VerticalAlignment.Center;
    const ownerLabelCell = new TableCell();
    ownerLabelCell.addItem(tb("Owner", { wrap: true, isSubtle: true }));
    const ownerValueCell = new TableCell();
    ownerValueCell.addItem(ownerColumnSet());
    ownerRow.addCell(ownerLabelCell);
    ownerRow.addCell(ownerValueCell);
    table.addRow(ownerRow);

    card.addItem(table);

    // --- body[5]: very-narrow stacked Container ---
    const stacked = new Container();
    stacked.separator = true;
    stacked.targetWidth = "VeryNarrow";
    stacked.addItem(tb("Account", { wrap: true, isSubtle: true }));
    stacked.addItem(tb("Fourth Coffee", { wrap: true, spacing: Spacing.None }));
    stacked.addItem(tb("Est. Revenue", { wrap: true, isSubtle: true }));
    stacked.addItem(tb("$3,000,000.00", { wrap: true, spacing: Spacing.None }));
    stacked.addItem(tb("Owner", { wrap: true, isSubtle: true }));
    stacked.addItem(ownerColumnSet(Spacing.None));
    card.addItem(stacked);

    // --- body[6]: standard-width ColumnSet (Account / Est. Revenue / Owner) ---
    const wide = new ColumnSet();
    wide.targetWidth = "AtLeast:Standard";
    wide.spacing = Spacing.Medium;

    const accountColumn = new Column(20);
    accountColumn.addItem(tb("Account", { wrap: true, isSubtle: true }));
    accountColumn.addItem(tb("Fabrikam", { wrap: true, spacing: Spacing.None }));

    const revenueColumn = new Column(25);
    revenueColumn.addItem(tb("Est. Revenue", { wrap: true, isSubtle: true }));
    revenueColumn.addItem(tb("$3,000,000.00", { wrap: true, spacing: Spacing.None }));

    const ownerColumn = new Column(25);
    ownerColumn.addItem(tb("Owner", { wrap: true, isSubtle: true }));
    ownerColumn.addItem(ownerColumnSet(Spacing.None));

    wide.addColumn(accountColumn);
    wide.addColumn(revenueColumn);
    wide.addColumn(ownerColumn);
    wide.addColumn(new Column("stretch"));
    card.addItem(wide);

    // --- body[7]: contact row with standard-width See more / See less toggle ---
    const contact = new ColumnSet();
    contact.separator = true;
    contact.spacing = Spacing.ExtraLarge;

    const contactAvatar = new Column("auto");
    contactAvatar.verticalContentAlignment = VerticalAlignment.Center;
    contactAvatar.addItem(
        Object.assign(new Image(AVATAR_LARGE), {
            style: ImageStyle.Person,
            pixelWidth: 35
        })
    );

    const contactName = new Column("stretch");
    contactName.verticalContentAlignment = VerticalAlignment.Center;
    contactName.spacing = Spacing.Small;
    contactName.addItem(tb("Mona Kane", { wrap: true }));
    contactName.addItem(
        tb("Contact", { wrap: true, spacing: Spacing.None, size: TextSize.Small, isSubtle: true })
    );

    const toggleColumnSet = new ColumnSet();

    const seeColumn = new Column("auto");
    seeColumn.targetWidth = "AtLeast:Narrow";
    seeColumn.verticalContentAlignment = VerticalAlignment.Center;
    seeColumn.rtl = false;
    seeColumn.addItem(seeToggle("showMore1", "See more"));
    seeColumn.addItem(seeToggle("showLess1", "See less", false));

    const chevronColumn = new Column("auto");
    chevronColumn.targetWidth = "AtLeast:Narrow";
    chevronColumn.verticalContentAlignment = VerticalAlignment.Bottom;
    chevronColumn.horizontalAlignment = HorizontalAlignment.Center;
    chevronColumn.spacing = Spacing.None;
    chevronColumn.addItem(chevron("chevronDown1", "ChevronDown"));
    chevronColumn.addItem(chevron("chevronUp1", "ChevronUp", false));

    toggleColumnSet.addColumn(seeColumn);
    toggleColumnSet.addColumn(chevronColumn);

    const contactToggle = new Column("auto");
    contactToggle.verticalContentAlignment = VerticalAlignment.Center;
    contactToggle.addItem(toggleColumnSet);

    contact.addColumn(contactAvatar);
    contact.addColumn(contactName);
    contact.addColumn(contactToggle);
    card.addItem(contact);

    // --- body[8]: very-narrow See more / See less toggle ---
    const narrowToggle = new ColumnSet();
    narrowToggle.targetWidth = "VeryNarrow";
    narrowToggle.spacing = Spacing.Small;

    const narrowSeeColumn = new Column("auto");
    narrowSeeColumn.verticalContentAlignment = VerticalAlignment.Center;
    narrowSeeColumn.addItem(seeToggle("showMore2", "See more"));
    narrowSeeColumn.addItem(seeToggle("showLess2", "See less", false));

    const narrowChevronColumn = new Column("auto");
    narrowChevronColumn.verticalContentAlignment = VerticalAlignment.Bottom;
    narrowChevronColumn.horizontalAlignment = HorizontalAlignment.Center;
    narrowChevronColumn.spacing = Spacing.None;
    narrowChevronColumn.addItem(chevron("chevronDown2", "ChevronDown"));
    narrowChevronColumn.addItem(chevron("chevronUp2", "ChevronUp", false));

    narrowToggle.addColumn(narrowSeeColumn);
    narrowToggle.addColumn(narrowChevronColumn);
    card.addItem(narrowToggle);

    // --- body[9]: hidden "More Info" target ---
    const moreText = new TextBlock("More Info");
    moreText.id = "moreText";
    moreText.isVisible = false;
    card.addItem(moreText);

    // --- body[10]: View Details action ---
    const actionSet = new ActionSet();
    actionSet.separator = true;
    actionSet.spacing = Spacing.ExtraLarge;
    const viewDetails = new OpenUrlAction();
    viewDetails.title = "View Details";
    viewDetails.url = "https://adaptivecards.io/";
    actionSet.addAction(viewDetails);
    card.addItem(actionSet);

    const expected = {
        type: "AdaptiveCard",
        $schema: "https://adaptivecards.io/schemas/adaptive-card.json",
        version: "1.6",
        body: [
            {
                type: "ColumnSet",
                columns: [
                    {
                        type: "Column",
                        width: "stretch",
                        items: [
                            {
                                type: "TextBlock",
                                text: "Fourth Coffee Distillery Equipment ",
                                size: "Large",
                                weight: "Bolder",
                                wrap: true
                            }
                        ],
                        verticalContentAlignment: "Center"
                    },
                    {
                        type: "Column",
                        targetWidth: "AtLeast:Standard",
                        width: "auto",
                        items: [
                            {
                                type: "TextBlock",
                                text: "Status",
                                wrap: true,
                                size: "Small",
                                weight: "Default",
                                isSubtle: true
                            },
                            {
                                type: "TextBlock",
                                text: "In Progress",
                                color: "Good",
                                spacing: "None",
                                size: "Small",
                                weight: "Bolder",
                                wrap: true
                            }
                        ],
                        spacing: "Small"
                    },
                    {
                        type: "Column",
                        targetWidth: "AtLeast:Standard",
                        width: "auto",
                        separator: true,
                        items: [
                            {
                                type: "TextBlock",
                                text: "Opportunity Score",
                                size: "Small",
                                weight: "Default",
                                isSubtle: true,
                                wrap: true
                            },
                            {
                                type: "TextBlock",
                                text: "91 - Grade A",
                                wrap: true,
                                weight: "Bolder",
                                spacing: "None",
                                size: "Small",
                                color: "Default"
                            }
                        ]
                    }
                ]
            },
            {
                type: "TextBlock",
                text: "Opportunity",
                wrap: true,
                isSubtle: true,
                spacing: "None"
            },
            {
                type: "TextBlock",
                targetWidth: "AtMost:Narrow",
                text: "In Progress",
                color: "Good",
                weight: "Bolder",
                wrap: true
            },
            {
                type: "TextBlock",
                targetWidth: "AtMost:Narrow",
                text: "91 - Grade A",
                wrap: true,
                weight: "Bolder",
                spacing: "None",
                color: "Default"
            },
            {
                type: "Table",
                targetWidth: "Narrow",
                columns: [
                    {
                        width: 2
                    },
                    {
                        width: 3
                    }
                ],
                rows: [
                    {
                        type: "TableRow",
                        cells: [
                            {
                                type: "TableCell",
                                items: [
                                    {
                                        type: "TextBlock",
                                        text: "Account",
                                        wrap: true,
                                        isSubtle: true
                                    }
                                ]
                            },
                            {
                                type: "TableCell",
                                items: [
                                    {
                                        type: "TextBlock",
                                        text: "Fourth Coffee",
                                        wrap: true
                                    }
                                ]
                            }
                        ],
                        verticalCellContentAlignment: "Center"
                    },
                    {
                        type: "TableRow",
                        cells: [
                            {
                                type: "TableCell",
                                items: [
                                    {
                                        type: "TextBlock",
                                        text: "Est. Revenue",
                                        wrap: true,
                                        isSubtle: true
                                    }
                                ]
                            },
                            {
                                type: "TableCell",
                                items: [
                                    {
                                        type: "TextBlock",
                                        text: "$3,000,000.00",
                                        wrap: true
                                    }
                                ]
                            }
                        ],
                        verticalCellContentAlignment: "Center"
                    },
                    {
                        type: "TableRow",
                        cells: [
                            {
                                type: "TableCell",
                                items: [
                                    {
                                        type: "TextBlock",
                                        text: "Owner",
                                        wrap: true,
                                        isSubtle: true
                                    }
                                ]
                            },
                            {
                                type: "TableCell",
                                items: [
                                    {
                                        type: "ColumnSet",
                                        columns: [
                                            {
                                                type: "Column",
                                                width: "auto",
                                                items: [
                                                    {
                                                        type: "Image",
                                                        url: AVATAR_SMALL,
                                                        width: "20px"
                                                    }
                                                ],
                                                verticalContentAlignment: "Center"
                                            },
                                            {
                                                type: "Column",
                                                width: "stretch",
                                                items: [
                                                    {
                                                        type: "TextBlock",
                                                        text: "Reta Taylor",
                                                        wrap: true
                                                    }
                                                ],
                                                spacing: "Small",
                                                verticalContentAlignment: "Center"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        verticalCellContentAlignment: "Center"
                    }
                ],
                firstRowAsHeaders: false,
                showGridLines: false,
                spacing: "Large",
                separator: true
            },
            {
                type: "Container",
                separator: true,
                targetWidth: "VeryNarrow",
                items: [
                    {
                        type: "TextBlock",
                        text: "Account",
                        wrap: true,
                        isSubtle: true
                    },
                    {
                        type: "TextBlock",
                        text: "Fourth Coffee",
                        wrap: true,
                        spacing: "None"
                    },
                    {
                        type: "TextBlock",
                        text: "Est. Revenue",
                        wrap: true,
                        isSubtle: true
                    },
                    {
                        type: "TextBlock",
                        text: "$3,000,000.00",
                        wrap: true,
                        spacing: "None"
                    },
                    {
                        type: "TextBlock",
                        text: "Owner",
                        wrap: true,
                        isSubtle: true
                    },
                    {
                        type: "ColumnSet",
                        columns: [
                            {
                                type: "Column",
                                width: "auto",
                                items: [
                                    {
                                        type: "Image",
                                        url: AVATAR_SMALL,
                                        width: "20px"
                                    }
                                ],
                                verticalContentAlignment: "Center"
                            },
                            {
                                type: "Column",
                                width: "stretch",
                                items: [
                                    {
                                        type: "TextBlock",
                                        text: "Reta Taylor",
                                        wrap: true
                                    }
                                ],
                                spacing: "Small",
                                verticalContentAlignment: "Center"
                            }
                        ],
                        spacing: "None"
                    }
                ]
            },
            {
                type: "ColumnSet",
                targetWidth: "AtLeast:Standard",
                columns: [
                    {
                        type: "Column",
                        width: 20,
                        items: [
                            {
                                type: "TextBlock",
                                text: "Account",
                                wrap: true,
                                isSubtle: true
                            },
                            {
                                type: "TextBlock",
                                text: "Fabrikam",
                                wrap: true,
                                spacing: "None"
                            }
                        ]
                    },
                    {
                        type: "Column",
                        width: 25,
                        items: [
                            {
                                type: "TextBlock",
                                text: "Est. Revenue",
                                wrap: true,
                                isSubtle: true
                            },
                            {
                                type: "TextBlock",
                                text: "$3,000,000.00",
                                wrap: true,
                                spacing: "None"
                            }
                        ]
                    },
                    {
                        type: "Column",
                        width: 25,
                        items: [
                            {
                                type: "TextBlock",
                                text: "Owner",
                                wrap: true,
                                isSubtle: true
                            },
                            {
                                type: "ColumnSet",
                                columns: [
                                    {
                                        type: "Column",
                                        width: "auto",
                                        items: [
                                            {
                                                type: "Image",
                                                url: AVATAR_SMALL,
                                                width: "20px"
                                            }
                                        ],
                                        verticalContentAlignment: "Center"
                                    },
                                    {
                                        type: "Column",
                                        width: "stretch",
                                        items: [
                                            {
                                                type: "TextBlock",
                                                text: "Reta Taylor",
                                                wrap: true
                                            }
                                        ],
                                        spacing: "Small",
                                        verticalContentAlignment: "Center"
                                    }
                                ],
                                spacing: "None"
                            }
                        ]
                    },
                    {
                        type: "Column",
                        width: "stretch"
                    }
                ],
                spacing: "Medium"
            },
            {
                type: "ColumnSet",
                separator: true,
                columns: [
                    {
                        type: "Column",
                        width: "auto",
                        verticalContentAlignment: "Center",
                        items: [
                            {
                                type: "Image",
                                url: AVATAR_LARGE,
                                style: "Person",
                                width: "35px"
                            }
                        ]
                    },
                    {
                        type: "Column",
                        width: "stretch",
                        items: [
                            {
                                type: "TextBlock",
                                text: "Mona Kane",
                                wrap: true
                            },
                            {
                                type: "TextBlock",
                                text: "Contact",
                                wrap: true,
                                spacing: "None",
                                size: "Small",
                                isSubtle: true
                            }
                        ],
                        verticalContentAlignment: "Center",
                        spacing: "Small"
                    },
                    {
                        type: "Column",
                        width: "auto",
                        items: [
                            {
                                type: "ColumnSet",
                                columns: [
                                    {
                                        type: "Column",
                                        targetWidth: "AtLeast:Narrow",
                                        width: "auto",
                                        items: [
                                            {
                                                type: "RichTextBlock",
                                                id: "showMore1",
                                                inlines: [
                                                    {
                                                        type: "TextRun",
                                                        text: "See more",
                                                        selectAction: {
                                                            type: "Action.ToggleVisibility",
                                                            targetElements: TOGGLE_TARGETS
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                type: "RichTextBlock",
                                                id: "showLess1",
                                                isVisible: false,
                                                inlines: [
                                                    {
                                                        type: "TextRun",
                                                        text: "See less",
                                                        selectAction: {
                                                            type: "Action.ToggleVisibility",
                                                            targetElements: TOGGLE_TARGETS
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        verticalContentAlignment: "Center",
                                        rtl: false
                                    },
                                    {
                                        type: "Column",
                                        targetWidth: "AtLeast:Narrow",
                                        width: "auto",
                                        items: [
                                            {
                                                type: "Icon",
                                                id: "chevronDown1",
                                                name: "ChevronDown",
                                                size: "xxSmall",
                                                color: "Accent",
                                                selectAction: {
                                                    type: "Action.ToggleVisibility",
                                                    targetElements: TOGGLE_TARGETS
                                                }
                                            },
                                            {
                                                type: "Icon",
                                                id: "chevronUp1",
                                                isVisible: false,
                                                name: "ChevronUp",
                                                size: "xxSmall",
                                                color: "Accent",
                                                selectAction: {
                                                    type: "Action.ToggleVisibility",
                                                    targetElements: TOGGLE_TARGETS
                                                }
                                            }
                                        ],
                                        verticalContentAlignment: "Bottom",
                                        horizontalAlignment: "Center",
                                        spacing: "None"
                                    }
                                ]
                            }
                        ],
                        verticalContentAlignment: "Center"
                    }
                ],
                spacing: "ExtraLarge"
            },
            {
                type: "ColumnSet",
                targetWidth: "VeryNarrow",
                columns: [
                    {
                        type: "Column",
                        width: "auto",
                        items: [
                            {
                                type: "RichTextBlock",
                                id: "showMore2",
                                inlines: [
                                    {
                                        type: "TextRun",
                                        text: "See more",
                                        selectAction: {
                                            type: "Action.ToggleVisibility",
                                            targetElements: TOGGLE_TARGETS
                                        }
                                    }
                                ]
                            },
                            {
                                type: "RichTextBlock",
                                id: "showLess2",
                                isVisible: false,
                                inlines: [
                                    {
                                        type: "TextRun",
                                        text: "See less",
                                        selectAction: {
                                            type: "Action.ToggleVisibility",
                                            targetElements: TOGGLE_TARGETS
                                        }
                                    }
                                ]
                            }
                        ],
                        verticalContentAlignment: "Center"
                    },
                    {
                        type: "Column",
                        width: "auto",
                        items: [
                            {
                                type: "Icon",
                                id: "chevronDown2",
                                name: "ChevronDown",
                                size: "xxSmall",
                                color: "Accent",
                                selectAction: {
                                    type: "Action.ToggleVisibility",
                                    targetElements: TOGGLE_TARGETS
                                }
                            },
                            {
                                type: "Icon",
                                id: "chevronUp2",
                                name: "ChevronUp",
                                isVisible: false,
                                size: "xxSmall",
                                color: "Accent",
                                selectAction: {
                                    type: "Action.ToggleVisibility",
                                    targetElements: TOGGLE_TARGETS
                                }
                            }
                        ],
                        verticalContentAlignment: "Bottom",
                        horizontalAlignment: "Center",
                        spacing: "None"
                    }
                ],
                spacing: "Small"
            },
            {
                type: "TextBlock",
                id: "moreText",
                text: "More Info",
                isVisible: false
            },
            {
                type: "ActionSet",
                separator: true,
                actions: [
                    {
                        type: "Action.OpenUrl",
                        title: "View Details",
                        url: "https://adaptivecards.io/"
                    }
                ],
                spacing: "ExtraLarge"
            }
        ]
    };

    expect(card.toJSON()).toEqual(expected);
});
