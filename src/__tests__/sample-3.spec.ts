// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { test, expect } from "bun:test";
import {
    ActionSet,
    AdaptiveCard,
    Column,
    ColumnSet,
    Container,
    HorizontalAlignment,
    Icon,
    IconSize,
    IconStyle,
    Image,
    ImageStyle,
    Spacing,
    SubmitAction,
    TargetWidth,
    TextBlock,
    TextColor,
    TextSize,
    TextWeight,
    ToggleVisibilityAction,
    VerticalAlignment,
    Versions
} from "../index";

const AVATAR_IMAGE =
    "https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/communication/assets/avatar.png";
const HERO_IMAGE =
    "https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/communication/assets/hero_image.png";

const TOGGLE_TARGETS = [
    "likeFilled",
    "likeOutline",
    "commentLike",
    "commentUnlike",
    "likeFilled2",
    "likeOutline2",
    "commentLike2",
    "commentUnlike2"
];

function createPostedBadge(targetWidth?: string): ColumnSet {
    const colSet = new ColumnSet();
    if (targetWidth) {
        colSet.targetWidth = targetWidth;
    }

    const iconCol = new Column("auto");
    const icon = new Icon("Megaphone");
    icon.style = IconStyle.Filled;
    icon.size = IconSize.xxSmall;
    icon.color = TextColor.Accent;
    iconCol.addItem(icon);

    const textCol = new Column("stretch");
    textCol.spacing = Spacing.Small;
    const badgeText = new TextBlock("Posted in Employee Deals");
    badgeText.isSubtle = true;
    badgeText.size = TextSize.Small;
    badgeText.wrap = true;
    textCol.addItem(badgeText);

    colSet.addColumn(iconCol);
    colSet.addColumn(textCol);
    return colSet;
}

function createAuthorHeader(targetWidth?: string): ColumnSet {
    const colSet = new ColumnSet();
    if (targetWidth) {
        colSet.targetWidth = targetWidth;
    }

    const avatarCol = new Column("auto");
    const avatar = new Image(AVATAR_IMAGE);
    avatar.altText = "Avatar of Laurence Gibertson";
    avatarCol.addItem(avatar);

    const nameCol = new Column("stretch");
    const name = new TextBlock("Laurence Gibertson");
    name.weight = TextWeight.Bolder;
    name.wrap = true;

    const date = new TextBlock("Oct 22");
    date.isSubtle = true;
    date.size = TextSize.Small;
    date.wrap = true;
    date.spacing = Spacing.None;

    nameCol.addItem(name);
    nameCol.addItem(date);

    colSet.addColumn(avatarCol);
    colSet.addColumn(nameCol);
    return colSet;
}

function createLikeActionSet(targetWidth?: string): ActionSet {
    const actionSet = new ActionSet();
    actionSet.spacing = Spacing.Medium;
    if (targetWidth) {
        actionSet.targetWidth = targetWidth;
    }

    const toggle = new ToggleVisibilityAction();
    toggle.title = "Like";
    for (const target of TOGGLE_TARGETS) {
        toggle.addTargetElement(target);
    }

    const submit = new SubmitAction();
    submit.title = "Comment";

    actionSet.addAction(toggle);
    actionSet.addAction(submit);
    return actionSet;
}

function createLikesColumnSet(
    verticalContentAlignment: VerticalAlignment,
    idSuffix: string
): ColumnSet {
    const colSet = new ColumnSet();
    colSet.spacing = Spacing.ExtraLarge;

    const iconCol = new Column("auto");
    iconCol.verticalContentAlignment = verticalContentAlignment;
    iconCol.spacing = Spacing.None;

    const likeOutline = new Icon("ThumbLike");
    likeOutline.id = `likeOutline${idSuffix}`;
    likeOutline.horizontalAlignment = HorizontalAlignment.Right;
    likeOutline.size = IconSize.xxSmall;

    const likeFilled = new Icon("ThumbLike");
    likeFilled.id = `likeFilled${idSuffix}`;
    likeFilled.horizontalAlignment = HorizontalAlignment.Right;
    likeFilled.style = IconStyle.Filled;
    likeFilled.size = IconSize.xxSmall;
    likeFilled.isVisible = false;

    iconCol.addItem(likeOutline);
    iconCol.addItem(likeFilled);

    const textCol = new Column("stretch");
    textCol.verticalContentAlignment = verticalContentAlignment;
    textCol.spacing = Spacing.Small;

    const commentLike = new TextBlock("26 people like this");
    commentLike.id = `commentLike${idSuffix}`;
    commentLike.size = TextSize.Small;
    commentLike.wrap = true;

    const commentUnlike = new TextBlock("27 people like this");
    commentUnlike.id = `commentUnlike${idSuffix}`;
    commentUnlike.size = TextSize.Small;
    commentUnlike.wrap = true;
    commentUnlike.isVisible = false;

    textCol.addItem(commentLike);
    textCol.addItem(commentUnlike);

    colSet.addColumn(iconCol);
    colSet.addColumn(textCol);
    return colSet;
}

test("sample-3 builds the Hawaii holiday escape communication card", () => {
    const card = new AdaptiveCard();
    card.speak = "Hawaii holiday escape deals start tonight";
    card.version = Versions.v1_6;

    // --- body[0]: Narrow posted badge ---
    card.addItem(createPostedBadge(TargetWidth.Narrow));

    // --- body[1]: Narrow author header ---
    card.addItem(createAuthorHeader(TargetWidth.Narrow));

    // --- body[2]: Main responsive ColumnSet (AtLeast:Narrow) ---
    const mainColSet = new ColumnSet();
    mainColSet.targetWidth = TargetWidth.AtLeastNarrow;

    // Column 0: stretch content
    const leftCol = new Column("stretch");
    leftCol.addItem(createPostedBadge(TargetWidth.AtLeastStandard));
    leftCol.addItem(createAuthorHeader(TargetWidth.AtLeastStandard));

    const promoTitle = new TextBlock("Hawaii holiday escape deals start tonight!");
    promoTitle.size = TextSize.Large;
    promoTitle.weight = TextWeight.Bolder;
    promoTitle.wrap = true;
    promoTitle.spacing = Spacing.Small;
    leftCol.addItem(promoTitle);

    const promoDesc = new TextBlock(
        "For a limited time, you can book a four night stay at luxury resort on the island of Maui for only $999 per person."
    );
    promoDesc.wrap = true;
    promoDesc.spacing = Spacing.Small;
    promoDesc.maxLines = 3;
    leftCol.addItem(promoDesc);

    const likesRow = createLikesColumnSet(VerticalAlignment.Bottom, "");
    likesRow.height = "stretch";
    leftCol.addItem(likesRow);

    // Column 1: auto images and ActionSet
    const rightCol = new Column("auto");

    const beachStandard = new Image(HERO_IMAGE);
    beachStandard.targetWidth = TargetWidth.AtLeastStandard;
    beachStandard.pixelWidth = 150;
    beachStandard.altText = "Beach Image";
    beachStandard.style = ImageStyle.RoundedCorners;
    rightCol.addItem(beachStandard);

    const beachNarrow = new Image(HERO_IMAGE);
    beachNarrow.targetWidth = TargetWidth.Narrow;
    beachNarrow.pixelWidth = 100;
    beachNarrow.altText = "Beach Image";
    beachNarrow.style = ImageStyle.RoundedCorners;
    rightCol.addItem(beachNarrow);

    rightCol.addItem(createLikeActionSet(TargetWidth.AtLeastStandard));

    mainColSet.addColumn(leftCol);
    mainColSet.addColumn(rightCol);
    card.addItem(mainColSet);

    // --- body[3]: VeryNarrow Container ---
    const veryNarrowContainer = new Container();
    veryNarrowContainer.targetWidth = TargetWidth.VeryNarrow;

    veryNarrowContainer.addItem(createPostedBadge());
    veryNarrowContainer.addItem(createAuthorHeader());

    const containerPromoTitle = new TextBlock("Hawaii holiday escape deals start tonight!");
    containerPromoTitle.size = TextSize.Large;
    containerPromoTitle.weight = TextWeight.Bolder;
    containerPromoTitle.wrap = true;
    containerPromoTitle.spacing = Spacing.Small;
    veryNarrowContainer.addItem(containerPromoTitle);

    const descImageColSet = new ColumnSet();
    const descCol = new Column("stretch");
    const containerPromoDesc = new TextBlock(
        "For a limited time, you can book a four night stay at luxury resort on the island of Maui for only $999 per person."
    );
    containerPromoDesc.maxLines = 4;
    containerPromoDesc.wrap = true;
    containerPromoDesc.spacing = Spacing.Small;
    descCol.addItem(containerPromoDesc);

    const imageCol = new Column("auto");
    const beach60 = new Image(HERO_IMAGE);
    beach60.pixelWidth = 60;
    beach60.style = ImageStyle.RoundedCorners;
    imageCol.addItem(beach60);

    descImageColSet.addColumn(descCol);
    descImageColSet.addColumn(imageCol);
    veryNarrowContainer.addItem(descImageColSet);

    veryNarrowContainer.addItem(createLikesColumnSet(VerticalAlignment.Center, "2"));
    card.addItem(veryNarrowContainer);

    // --- body[4]: AtMost:Narrow ActionSet ---
    card.addItem(createLikeActionSet(TargetWidth.AtMostNarrow));

    const expected = {
        type: "AdaptiveCard",
        $schema: "https://adaptivecards.io/schemas/adaptive-card.json",
        version: "1.6",
        speak: "Hawaii holiday escape deals start tonight",
        body: [
            {
                columns: [
                    {
                        width: "auto",
                        items: [
                            {
                                type: "Icon",
                                name: "Megaphone",
                                style: "Filled",
                                size: "xxSmall",
                                color: "Accent"
                            }
                        ],
                        type: "Column"
                    },
                    {
                        width: "stretch",
                        items: [
                            {
                                isSubtle: true,
                                size: "Small",
                                text: "Posted in Employee Deals",
                                wrap: true,
                                type: "TextBlock"
                            }
                        ],
                        spacing: "Small",
                        type: "Column"
                    }
                ],
                type: "ColumnSet",
                targetWidth: "Narrow"
            },
            {
                columns: [
                    {
                        width: "auto",
                        items: [
                            {
                                url: AVATAR_IMAGE,
                                type: "Image",
                                altText: "Avatar of Laurence Gibertson"
                            }
                        ],
                        type: "Column"
                    },
                    {
                        width: "stretch",
                        items: [
                            {
                                text: "Laurence Gibertson",
                                weight: "Bolder",
                                wrap: true,
                                type: "TextBlock"
                            },
                            {
                                isSubtle: true,
                                size: "Small",
                                text: "Oct 22",
                                wrap: true,
                                spacing: "None",
                                type: "TextBlock"
                            }
                        ],
                        type: "Column"
                    }
                ],
                type: "ColumnSet",
                targetWidth: "Narrow"
            },
            {
                columns: [
                    {
                        width: "stretch",
                        items: [
                            {
                                columns: [
                                    {
                                        width: "auto",
                                        items: [
                                            {
                                                type: "Icon",
                                                name: "Megaphone",
                                                style: "Filled",
                                                size: "xxSmall",
                                                color: "Accent"
                                            }
                                        ],
                                        type: "Column"
                                    },
                                    {
                                        width: "stretch",
                                        items: [
                                            {
                                                isSubtle: true,
                                                size: "Small",
                                                text: "Posted in Employee Deals",
                                                wrap: true,
                                                type: "TextBlock"
                                            }
                                        ],
                                        spacing: "Small",
                                        type: "Column"
                                    }
                                ],
                                targetWidth: "AtLeast:Standard",
                                type: "ColumnSet"
                            },
                            {
                                columns: [
                                    {
                                        width: "auto",
                                        items: [
                                            {
                                                url: AVATAR_IMAGE,
                                                type: "Image",
                                                altText: "Avatar of Laurence Gibertson"
                                            }
                                        ],
                                        type: "Column"
                                    },
                                    {
                                        width: "stretch",
                                        items: [
                                            {
                                                text: "Laurence Gibertson",
                                                weight: "Bolder",
                                                wrap: true,
                                                type: "TextBlock"
                                            },
                                            {
                                                isSubtle: true,
                                                size: "Small",
                                                text: "Oct 22",
                                                wrap: true,
                                                spacing: "None",
                                                type: "TextBlock"
                                            }
                                        ],
                                        type: "Column"
                                    }
                                ],
                                targetWidth: "AtLeast:Standard",
                                type: "ColumnSet"
                            },
                            {
                                size: "Large",
                                text: "Hawaii holiday escape deals start tonight!",
                                weight: "Bolder",
                                wrap: true,
                                spacing: "Small",
                                type: "TextBlock"
                            },
                            {
                                text: "For a limited time, you can book a four night stay at luxury resort on the island of Maui for only $999 per person.",
                                wrap: true,
                                spacing: "Small",
                                type: "TextBlock",
                                maxLines: 3
                            },
                            {
                                columns: [
                                    {
                                        width: "auto",
                                        items: [
                                            {
                                                horizontalAlignment: "Right",
                                                id: "likeOutline",
                                                type: "Icon",
                                                name: "ThumbLike",
                                                size: "xxSmall"
                                            },
                                            {
                                                horizontalAlignment: "Right",
                                                id: "likeFilled",
                                                type: "Icon",
                                                name: "ThumbLike",
                                                style: "Filled",
                                                size: "xxSmall",
                                                isVisible: false
                                            }
                                        ],
                                        verticalContentAlignment: "Bottom",
                                        spacing: "None",
                                        type: "Column"
                                    },
                                    {
                                        width: "stretch",
                                        items: [
                                            {
                                                size: "Small",
                                                text: "26 people like this",
                                                wrap: true,
                                                id: "commentLike",
                                                type: "TextBlock"
                                            },
                                            {
                                                size: "Small",
                                                text: "27 people like this",
                                                wrap: true,
                                                id: "commentUnlike",
                                                isVisible: false,
                                                type: "TextBlock"
                                            }
                                        ],
                                        verticalContentAlignment: "Bottom",
                                        spacing: "Small",
                                        type: "Column"
                                    }
                                ],
                                height: "stretch",
                                spacing: "ExtraLarge",
                                type: "ColumnSet"
                            }
                        ],
                        type: "Column"
                    },
                    {
                        width: "auto",
                        items: [
                            {
                                targetWidth: "AtLeast:Standard",
                                url: HERO_IMAGE,
                                width: "150px",
                                type: "Image",
                                altText: "Beach Image",
                                style: "RoundedCorners"
                            },
                            {
                                targetWidth: "Narrow",
                                url: HERO_IMAGE,
                                width: "100px",
                                type: "Image",
                                altText: "Beach Image",
                                style: "RoundedCorners"
                            },
                            {
                                targetWidth: "AtLeast:Standard",
                                actions: [
                                    {
                                        targetElements: TOGGLE_TARGETS,
                                        title: "Like",
                                        type: "Action.ToggleVisibility"
                                    },
                                    {
                                        title: "Comment",
                                        type: "Action.Submit"
                                    }
                                ],
                                spacing: "Medium",
                                type: "ActionSet"
                            }
                        ],
                        type: "Column"
                    }
                ],
                type: "ColumnSet",
                targetWidth: "AtLeast:Narrow"
            },
            {
                type: "Container",
                targetWidth: "VeryNarrow",
                items: [
                    {
                        columns: [
                            {
                                width: "auto",
                                items: [
                                    {
                                        type: "Icon",
                                        name: "Megaphone",
                                        style: "Filled",
                                        size: "xxSmall",
                                        color: "Accent"
                                    }
                                ],
                                type: "Column"
                            },
                            {
                                width: "stretch",
                                items: [
                                    {
                                        isSubtle: true,
                                        size: "Small",
                                        text: "Posted in Employee Deals",
                                        wrap: true,
                                        type: "TextBlock"
                                    }
                                ],
                                spacing: "Small",
                                type: "Column"
                            }
                        ],
                        type: "ColumnSet"
                    },
                    {
                        columns: [
                            {
                                width: "auto",
                                items: [
                                    {
                                        url: AVATAR_IMAGE,
                                        type: "Image",
                                        altText: "Avatar of Laurence Gibertson"
                                    }
                                ],
                                type: "Column"
                            },
                            {
                                width: "stretch",
                                items: [
                                    {
                                        text: "Laurence Gibertson",
                                        weight: "Bolder",
                                        wrap: true,
                                        type: "TextBlock"
                                    },
                                    {
                                        isSubtle: true,
                                        size: "Small",
                                        text: "Oct 22",
                                        wrap: true,
                                        spacing: "None",
                                        type: "TextBlock"
                                    }
                                ],
                                type: "Column"
                            }
                        ],
                        type: "ColumnSet"
                    },
                    {
                        size: "Large",
                        text: "Hawaii holiday escape deals start tonight!",
                        weight: "Bolder",
                        wrap: true,
                        spacing: "Small",
                        type: "TextBlock"
                    },
                    {
                        columns: [
                            {
                                width: "stretch",
                                items: [
                                    {
                                        maxLines: 4,
                                        text: "For a limited time, you can book a four night stay at luxury resort on the island of Maui for only $999 per person.",
                                        wrap: true,
                                        spacing: "Small",
                                        type: "TextBlock"
                                    }
                                ],
                                type: "Column"
                            },
                            {
                                width: "auto",
                                items: [
                                    {
                                        url: HERO_IMAGE,
                                        width: "60px",
                                        type: "Image",
                                        style: "RoundedCorners"
                                    }
                                ],
                                type: "Column"
                            }
                        ],
                        type: "ColumnSet"
                    },
                    {
                        columns: [
                            {
                                width: "auto",
                                items: [
                                    {
                                        horizontalAlignment: "Right",
                                        id: "likeOutline2",
                                        type: "Icon",
                                        name: "ThumbLike",
                                        size: "xxSmall"
                                    },
                                    {
                                        horizontalAlignment: "Right",
                                        id: "likeFilled2",
                                        type: "Icon",
                                        name: "ThumbLike",
                                        style: "Filled",
                                        size: "xxSmall",
                                        isVisible: false
                                    }
                                ],
                                verticalContentAlignment: "Center",
                                spacing: "None",
                                type: "Column"
                            },
                            {
                                width: "stretch",
                                items: [
                                    {
                                        size: "Small",
                                        text: "26 people like this",
                                        wrap: true,
                                        id: "commentLike2",
                                        type: "TextBlock"
                                    },
                                    {
                                        size: "Small",
                                        text: "27 people like this",
                                        wrap: true,
                                        id: "commentUnlike2",
                                        isVisible: false,
                                        type: "TextBlock"
                                    }
                                ],
                                verticalContentAlignment: "Center",
                                spacing: "Small",
                                type: "Column"
                            }
                        ],
                        spacing: "ExtraLarge",
                        type: "ColumnSet"
                    }
                ]
            },
            {
                actions: [
                    {
                        targetElements: TOGGLE_TARGETS,
                        title: "Like",
                        type: "Action.ToggleVisibility"
                    },
                    {
                        title: "Comment",
                        type: "Action.Submit"
                    }
                ],
                spacing: "Medium",
                type: "ActionSet",
                targetWidth: "AtMost:Narrow"
            }
        ]
    };

    expect(card.toJSON()).toEqual(expected);
});
