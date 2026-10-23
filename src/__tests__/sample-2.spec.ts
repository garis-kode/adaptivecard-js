// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { test, expect } from "bun:test";
import {
    ActionSet,
    AdaptiveCard,
    Column,
    ColumnSet,
    Image,
    ImageStyle,
    OpenUrlAction,
    Spacing,
    TargetWidth,
    TextBlock,
    TextSize,
    TextWeight,
    VerticalAlignment,
    Versions
} from "../index";

const VIDEO_IMAGE =
    "https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/author-highlight-video/assets/video_image.png";
const AVATAR_IMAGE =
    "https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/author-highlight-video/assets/avatar.png";

test("sample-2 builds the author highlight video card", () => {
    const card = new AdaptiveCard();
    card.speak = "3 minute energy flow with kayo video";
    card.version = Versions.v1_6;

    // --- body[0]: Hero Image ---
    const heroImage = new Image(VIDEO_IMAGE);
    heroImage.altText = "3 Minute Energy Flow with Kayo Video";
    heroImage.style = ImageStyle.RoundedCorners;
    card.addItem(heroImage);

    // --- body[1]: Title TextBlock ---
    const title = new TextBlock("3 Minute Energy Flow with Kayo");
    title.wrap = true;
    title.size = TextSize.Large;
    title.weight = TextWeight.Bolder;
    card.addItem(title);

    // --- body[2]: Author ColumnSet (Avatar + Name) ---
    const authorColumnSet = new ColumnSet();

    const avatarColumn = new Column("auto");
    avatarColumn.verticalContentAlignment = VerticalAlignment.Center;
    const avatar = new Image(AVATAR_IMAGE);
    avatar.pixelWidth = 24;
    avatar.pixelHeight = 24;
    avatar.style = ImageStyle.Person;
    avatar.altText = "Avatar of Kayo Miwa";
    avatarColumn.addItem(avatar);

    const nameColumn = new Column("stretch");
    nameColumn.spacing = Spacing.Small;
    nameColumn.verticalContentAlignment = VerticalAlignment.Center;
    const authorName = new TextBlock("Kayo Miwa");
    authorName.wrap = true;
    nameColumn.addItem(authorName);

    authorColumnSet.addColumn(avatarColumn);
    authorColumnSet.addColumn(nameColumn);
    card.addItem(authorColumnSet);

    // --- body[3]: Description for AtLeast:Narrow ---
    const descNarrow = new TextBlock(
        "Feeling sluggish or sleepy? Try this quick 3 minute flow to awaken your body and mind! All you need is a little space, and get ready to stretch your arms and legs."
    );
    descNarrow.targetWidth = TargetWidth.AtLeastNarrow;
    descNarrow.wrap = true;
    card.addItem(descNarrow);

    // --- body[4]: Description for VeryNarrow ---
    const descVeryNarrow = new TextBlock(
        "Feeling sluggish or sleepy? Try this quick 3 minute flow to awaken your body and..."
    );
    descVeryNarrow.targetWidth = TargetWidth.VeryNarrow;
    descVeryNarrow.wrap = true;
    card.addItem(descVeryNarrow);

    // --- body[5]: ActionSet with Open and Remind me ---
    const actionSet = new ActionSet();

    const openAction = new OpenUrlAction();
    openAction.title = "Open";
    openAction.url = "https://adaptivecards.io/";

    const remindAction = new OpenUrlAction();
    remindAction.title = "Remind me";
    remindAction.url = "https://adaptivecards.io/";
    remindAction.iconUrl = "icon:AlertUrgent";

    actionSet.addAction(openAction);
    actionSet.addAction(remindAction);
    card.addItem(actionSet);

    const expected = {
        type: "AdaptiveCard",
        speak: "3 minute energy flow with kayo video",
        $schema: "https://adaptivecards.io/schemas/adaptive-card.json",
        version: "1.6",
        body: [
            {
                type: "Image",
                url: VIDEO_IMAGE,
                altText: "3 Minute Energy Flow with Kayo Video",
                style: "RoundedCorners"
            },
            {
                type: "TextBlock",
                text: "3 Minute Energy Flow with Kayo",
                wrap: true,
                size: "Large",
                weight: "Bolder"
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
                                url: AVATAR_IMAGE,
                                width: "24px",
                                height: "24px",
                                style: "Person",
                                altText: "Avatar of Kayo Miwa"
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
                                text: "Kayo Miwa",
                                wrap: true
                            }
                        ],
                        spacing: "Small",
                        verticalContentAlignment: "Center"
                    }
                ]
            },
            {
                type: "TextBlock",
                targetWidth: "AtLeast:Narrow",
                text: "Feeling sluggish or sleepy? Try this quick 3 minute flow to awaken your body and mind! All you need is a little space, and get ready to stretch your arms and legs.",
                wrap: true
            },
            {
                type: "TextBlock",
                targetWidth: "VeryNarrow",
                text: "Feeling sluggish or sleepy? Try this quick 3 minute flow to awaken your body and...",
                wrap: true
            },
            {
                type: "ActionSet",
                actions: [
                    {
                        type: "Action.OpenUrl",
                        title: "Open",
                        url: "https://adaptivecards.io/"
                    },
                    {
                        type: "Action.OpenUrl",
                        title: "Remind me",
                        url: "https://adaptivecards.io/",
                        iconUrl: "icon:AlertUrgent"
                    }
                ]
            }
        ]
    };

    expect(card.toJSON()).toEqual(expected);
});
