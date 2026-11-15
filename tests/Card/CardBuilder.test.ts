import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  ActionMode,
  ActionSet,
  ActionStyle,
  AdaptiveCard,
  BackgroundImage,
  ChoiceInputStyle,
  ChoiceSetInput,
  Colors,
  Column,
  ColumnSet,
  Container,
  ContainerStyle,
  DateInput,
  ExecuteAction,
  FlowLayout,
  FontType,
  Height,
  HorizontalAlignment,
  Icon,
  IconSize,
  IconStyle,
  Image,
  ImageFillMode,
  ImageSize,
  ImageStyle,
  ItemFit,
  NumberInput,
  OpenUrlAction,
  Rating,
  RatingColor,
  RatingInput,
  RatingSize,
  RichTextBlock,
  Spacing,
  SubmitAction,
  Table,
  TableCell,
  TableColumnDefinition,
  TableRow,
  TargetElement,
  TargetWidth,
  TextBlock,
  TextInput,
  TextRun,
  TextSize,
  TextWeight,
  TimeInput,
  ToggleInput,
  ToggleVisibilityAction,
  VerticalAlignment,
  Width,
} from '../../index.ts';

function assertMatchesFixture(card: AdaptiveCard, fixture: string): void {
  const path = join(import.meta.dir, '..', 'fixtures', `${fixture}.json`);
  const json = readFileSync(path, 'utf8');
  const expected = JSON.parse(json) as Record<string, unknown>;

  expect(card.toObject()).toEqual(expected);
  expect(card.toArray()).toEqual(expected);
  expect(JSON.parse(card.toJson())).toEqual(expected);
}

describe('CardBuilderTest', () => {
  test('build Opportunity Card (1-fabricam-opportunity-status)', () => {
    const toggleTargets = [
      TargetElement.make('showMore1'),
      TargetElement.make('showLess1'),
      TargetElement.make('showMore2'),
      TargetElement.make('showLess2'),
      TargetElement.make('chevronDown1'),
      TargetElement.make('chevronUp1'),
      TargetElement.make('chevronDown2'),
      TargetElement.make('chevronUp2'),
      TargetElement.make('moreText'),
    ];

    const createToggleAction = (): ToggleVisibilityAction =>
      ToggleVisibilityAction.make().targetElements(toggleTargets);

    const card = AdaptiveCard.make('1.6')
      .schema('https://adaptivecards.io/schemas/adaptive-card.json')
      .addColumnSet((cs: ColumnSet) => {
        cs.column(Width.Stretch, (c: Column) => {
          c.verticalContentAlignment(VerticalAlignment.Center).addTextBlock(
            'Fourth Coffee Distillery Equipment ',
            (t: TextBlock) => {
              t.size(TextSize.Large).weight(TextWeight.Bolder).wrap(true);
            },
          );
        })
          .column(Width.Auto, (c: Column) => {
            c.targetWidth(TargetWidth.AtLeastStandard)
              .spacing(Spacing.Small)
              .addTextBlock('Status', (t: TextBlock) => {
                t.wrap(true)
                  .size(TextSize.Small)
                  .weight(TextWeight.Default)
                  .isSubtle(true);
              })
              .addTextBlock('In Progress', (t: TextBlock) => {
                t.color(Colors.Good)
                  .spacing(Spacing.None)
                  .size(TextSize.Small)
                  .weight(TextWeight.Bolder)
                  .wrap(true);
              });
          })
          .column(Width.Auto, (c: Column) => {
            c.targetWidth(TargetWidth.AtLeastStandard)
              .separator(true)
              .addTextBlock('Opportunity Score', (t: TextBlock) => {
                t.size(TextSize.Small)
                  .weight(TextWeight.Default)
                  .isSubtle(true)
                  .wrap(true);
              })
              .addTextBlock('91 - Grade A', (t: TextBlock) => {
                t.wrap(true)
                  .weight(TextWeight.Bolder)
                  .spacing(Spacing.None)
                  .size(TextSize.Small)
                  .color(Colors.Default);
              });
          });
      })
      .addTextBlock('Opportunity', (t: TextBlock) => {
        t.wrap(true).isSubtle(true).spacing(Spacing.None);
      })
      .addTextBlock('In Progress', (t: TextBlock) => {
        t.targetWidth(TargetWidth.AtMostNarrow)
          .color(Colors.Good)
          .weight(TextWeight.Bolder)
          .wrap(true);
      })
      .addTextBlock('91 - Grade A', (t: TextBlock) => {
        t.targetWidth(TargetWidth.AtMostNarrow)
          .weight(TextWeight.Bolder)
          .spacing(Spacing.None)
          .color(Colors.Default)
          .wrap(true);
      })
      .addTable((table: Table) => {
        table
          .targetWidth(TargetWidth.Narrow)
          .addColumns(TableColumnDefinition.make(2))
          .addColumns(TableColumnDefinition.make(3))
          .addRows(
            TableRow.make()
              .verticalCellContentAlignment(VerticalAlignment.Center)
              .addCells(
                TableCell.make().addTextBlock('Account', (t: TextBlock) => {
                  t.wrap(true).isSubtle(true);
                }),
              )
              .addCells(
                TableCell.make().addTextBlock('Fourth Coffee', (t: TextBlock) => {
                  t.wrap(true);
                }),
              ),
          )
          .addRows(
            TableRow.make()
              .verticalCellContentAlignment(VerticalAlignment.Center)
              .addCells(
                TableCell.make().addTextBlock('Est. Revenue', (t: TextBlock) => {
                  t.wrap(true).isSubtle(true);
                }),
              )
              .addCells(
                TableCell.make().addTextBlock('$3,000,000.00', (t: TextBlock) => {
                  t.wrap(true);
                }),
              ),
          )
          .addRows(
            TableRow.make()
              .verticalCellContentAlignment(VerticalAlignment.Center)
              .addCells(
                TableCell.make().addTextBlock('Owner', (t: TextBlock) => {
                  t.wrap(true).isSubtle(true);
                }),
              )
              .addCells(
                TableCell.make().addColumnSet((cs: ColumnSet) => {
                  cs.column(Width.Auto, (c: Column) => {
                    c.verticalContentAlignment(VerticalAlignment.Center).addImage(
                      'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/account/assets/avatar_small.png',
                      (img: Image) => {
                        img.width('20px');
                      },
                    );
                  }).column(Width.Stretch, (c: Column) => {
                    c.spacing(Spacing.Small)
                      .verticalContentAlignment(VerticalAlignment.Center)
                      .addTextBlock('Reta Taylor', (t: TextBlock) => {
                        t.wrap(true);
                      });
                  });
                }),
              ),
          )
          .firstRowAsHeaders(false)
          .showGridLines(false)
          .spacing(Spacing.Large)
          .separator(true);
      })
      .addContainer((cont: Container) => {
        cont
          .separator(true)
          .targetWidth(TargetWidth.VeryNarrow)
          .addTextBlock('Account', (t: TextBlock) => {
            t.wrap(true).isSubtle(true);
          })
          .addTextBlock('Fourth Coffee', (t: TextBlock) => {
            t.wrap(true).spacing(Spacing.None);
          })
          .addTextBlock('Est. Revenue', (t: TextBlock) => {
            t.wrap(true).isSubtle(true);
          })
          .addTextBlock('$3,000,000.00', (t: TextBlock) => {
            t.wrap(true).spacing(Spacing.None);
          })
          .addTextBlock('Owner', (t: TextBlock) => {
            t.wrap(true).isSubtle(true);
          })
          .addColumnSet((cs: ColumnSet) => {
            cs.spacing(Spacing.None)
              .column(Width.Auto, (c: Column) => {
                c.verticalContentAlignment(VerticalAlignment.Center).addImage(
                  'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/account/assets/avatar_small.png',
                  (img: Image) => {
                    img.width('20px');
                  },
                );
              })
              .column(Width.Stretch, (c: Column) => {
                c.spacing(Spacing.Small)
                  .verticalContentAlignment(VerticalAlignment.Center)
                  .addTextBlock('Reta Taylor', (t: TextBlock) => {
                    t.wrap(true);
                  });
              });
          });
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.targetWidth(TargetWidth.AtLeastStandard)
          .spacing(Spacing.Medium)
          .column(20, (c: Column) => {
            c.addTextBlock('Account', (t: TextBlock) => {
              t.wrap(true).isSubtle(true);
            }).addTextBlock('Fabrikam', (t: TextBlock) => {
              t.wrap(true).spacing(Spacing.None);
            });
          })
          .column(25, (c: Column) => {
            c.addTextBlock('Est. Revenue', (t: TextBlock) => {
              t.wrap(true).isSubtle(true);
            }).addTextBlock('$3,000,000.00', (t: TextBlock) => {
              t.wrap(true).spacing(Spacing.None);
            });
          })
          .column(25, (c: Column) => {
            c.addTextBlock('Owner', (t: TextBlock) => {
              t.wrap(true).isSubtle(true);
            }).addColumnSet((innerCs: ColumnSet) => {
              innerCs
                .spacing(Spacing.None)
                .column(Width.Auto, (col: Column) => {
                  col
                    .verticalContentAlignment(VerticalAlignment.Center)
                    .addImage(
                      'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/account/assets/avatar_small.png',
                      (img: Image) => {
                        img.width('20px');
                      },
                    );
                })
                .column(Width.Stretch, (col: Column) => {
                  col
                    .spacing(Spacing.Small)
                    .verticalContentAlignment(VerticalAlignment.Center)
                    .addTextBlock('Reta Taylor', (t: TextBlock) => {
                      t.wrap(true);
                    });
                });
            });
          })
          .column(Width.Stretch);
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.separator(true)
          .spacing(Spacing.ExtraLarge)
          .column(Width.Auto, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Center).addImage(
              'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/account/assets/avatar_large.png',
              (img: Image) => {
                img.style(ImageStyle.Person).width('35px');
              },
            );
          })
          .column(Width.Stretch, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Center)
              .spacing(Spacing.Small)
              .addTextBlock('Mona Kane', (t: TextBlock) => {
                t.wrap(true);
              })
              .addTextBlock('Contact', (t: TextBlock) => {
                t.wrap(true)
                  .spacing(Spacing.None)
                  .size(TextSize.Small)
                  .isSubtle(true);
              });
          })
          .column(Width.Auto, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Center).addColumnSet(
              (subCs: ColumnSet) => {
                subCs
                  .column(Width.Auto, (col: Column) => {
                    col
                      .targetWidth(TargetWidth.AtLeastNarrow)
                      .verticalContentAlignment(VerticalAlignment.Center)
                      .rtl(false)
                      .addRichTextBlock((rtb: RichTextBlock) => {
                        rtb
                          .id('showMore1')
                          .addInlines(
                            TextRun.make('See more').selectAction(
                              createToggleAction(),
                            ),
                          );
                      })
                      .addRichTextBlock((rtb: RichTextBlock) => {
                        rtb
                          .id('showLess1')
                          .isVisible(false)
                          .addInlines(
                            TextRun.make('See less').selectAction(
                              createToggleAction(),
                            ),
                          );
                      });
                  })
                  .column(Width.Auto, (col: Column) => {
                    col
                      .targetWidth(TargetWidth.AtLeastNarrow)
                      .verticalContentAlignment(VerticalAlignment.Bottom)
                      .horizontalAlignment(HorizontalAlignment.Center)
                      .spacing(Spacing.None)
                      .addIcon('ChevronDown', (i: Icon) => {
                        i.id('chevronDown1')
                          .size(IconSize.XxSmall)
                          .color(Colors.Accent)
                          .selectAction(createToggleAction());
                      })
                      .addIcon('ChevronUp', (i: Icon) => {
                        i.id('chevronUp1')
                          .isVisible(false)
                          .size(IconSize.XxSmall)
                          .color(Colors.Accent)
                          .selectAction(createToggleAction());
                      });
                  });
              },
            );
          });
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.targetWidth(TargetWidth.VeryNarrow)
          .spacing(Spacing.Small)
          .column(Width.Auto, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Center)
              .addRichTextBlock((rtb: RichTextBlock) => {
                rtb
                  .id('showMore2')
                  .addInlines(
                    TextRun.make('See more').selectAction(createToggleAction()),
                  );
              })
              .addRichTextBlock((rtb: RichTextBlock) => {
                rtb
                  .id('showLess2')
                  .isVisible(false)
                  .addInlines(
                    TextRun.make('See less').selectAction(createToggleAction()),
                  );
              });
          })
          .column(Width.Auto, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Bottom)
              .horizontalAlignment(HorizontalAlignment.Center)
              .spacing(Spacing.None)
              .addIcon('ChevronDown', (i: Icon) => {
                i.id('chevronDown2')
                  .size(IconSize.XxSmall)
                  .color(Colors.Accent)
                  .selectAction(createToggleAction());
              })
              .addIcon('ChevronUp', (i: Icon) => {
                i.id('chevronUp2')
                  .isVisible(false)
                  .size(IconSize.XxSmall)
                  .color(Colors.Accent)
                  .selectAction(createToggleAction());
              });
          });
      })
      .addTextBlock('More Info', (t: TextBlock) => {
        t.id('moreText').isVisible(false);
      })
      .addActionSet((as: ActionSet) => {
        as.separator(true)
          .spacing(Spacing.ExtraLarge)
          .addActions(
            OpenUrlAction.make('https://adaptivecards.io/', 'View Details'),
          );
      });

    assertMatchesFixture(card, '1-fabricam-opportunity-status');
  });

  test('build Author Highlight Video Card (2-author-video-3-minute-energy-flow)', () => {
    const card = AdaptiveCard.make('1.6')
      .schema('https://adaptivecards.io/schemas/adaptive-card.json')
      .speak('3 minute energy flow with kayo video')
      .addImage(
        'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/author-highlight-video/assets/video_image.png',
        (img: Image) => {
          img
            .altText('3 Minute Energy Flow with Kayo Video')
            .style(ImageStyle.RoundedCorners);
        },
      )
      .addTextBlock('3 Minute Energy Flow with Kayo', (t: TextBlock) => {
        t.wrap(true).size(TextSize.Large).weight(TextWeight.Bolder);
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.column(Width.Auto, (c: Column) => {
          c.verticalContentAlignment(VerticalAlignment.Center).addImage(
            'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/author-highlight-video/assets/avatar.png',
            (img: Image) => {
              img
                .width('24px')
                .height('24px')
                .style(ImageStyle.Person)
                .altText('Avatar of Kayo Miwa');
            },
          );
        }).column(Width.Stretch, (c: Column) => {
          c.spacing(Spacing.Small)
            .verticalContentAlignment(VerticalAlignment.Center)
            .addTextBlock('Kayo Miwa', (t: TextBlock) => {
              t.wrap(true);
            });
        });
      })
      .addTextBlock(
        'Feeling sluggish or sleepy? Try this quick 3 minute flow to awaken your body and mind! All you need is a little space, and get ready to stretch your arms and legs.',
        (t: TextBlock) => {
          t.targetWidth(TargetWidth.AtLeastNarrow).wrap(true);
        },
      )
      .addTextBlock(
        'Feeling sluggish or sleepy? Try this quick 3 minute flow to awaken your body and...',
        (t: TextBlock) => {
          t.targetWidth(TargetWidth.VeryNarrow).wrap(true);
        },
      )
      .addActionSet((as: ActionSet) => {
        as.addActions(
          OpenUrlAction.make('https://adaptivecards.io/', 'Open'),
        ).addActions(
          OpenUrlAction.make('https://adaptivecards.io/', 'Remind me').iconUrl(
            'icon:AlertUrgent',
          ),
        );
      });

    assertMatchesFixture(card, '2-author-video-3-minute-energy-flow');
  });

  test('build Communication Holiday Deals Card (3-social-post-hawaii-holiday-deals)', () => {
    const toggleTargets = [
      TargetElement.make('likeFilled'),
      TargetElement.make('likeOutline'),
      TargetElement.make('commentLike'),
      TargetElement.make('commentUnlike'),
      TargetElement.make('likeFilled2'),
      TargetElement.make('likeOutline2'),
      TargetElement.make('commentLike2'),
      TargetElement.make('commentUnlike2'),
    ];

    const avatarUrl =
      'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/communication/assets/avatar.png';
    const heroImageUrl =
      'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/communication/assets/hero_image.png';

    const card = AdaptiveCard.make('1.6')
      .schema('https://adaptivecards.io/schemas/adaptive-card.json')
      .speak('Hawaii holiday escape deals start tonight')
      .addColumnSet((cs: ColumnSet) => {
        cs.targetWidth(TargetWidth.Narrow)
          .column(Width.Auto, (c: Column) => {
            c.addIcon('Megaphone', (i: Icon) => {
              i.style(IconStyle.Filled)
                .size(IconSize.XxSmall)
                .color(Colors.Accent);
            });
          })
          .column(Width.Stretch, (c: Column) => {
            c.spacing(Spacing.Small).addTextBlock(
              'Posted in Employee Deals',
              (t: TextBlock) => {
                t.isSubtle(true).size(TextSize.Small).wrap(true);
              },
            );
          });
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.targetWidth(TargetWidth.Narrow)
          .column(Width.Auto, (c: Column) => {
            c.addImage(avatarUrl, (img: Image) => {
              img
                .height(Height.Auto)
                .altText('Avatar of Laurence Gibertson');
            });
          })
          .column(Width.Stretch, (c: Column) => {
            c.addTextBlock('Laurence Gibertson', (t: TextBlock) => {
              t.weight(TextWeight.Bolder).wrap(true);
            }).addTextBlock('Oct 22', (t: TextBlock) => {
              t.isSubtle(true)
                .size(TextSize.Small)
                .wrap(true)
                .spacing(Spacing.None);
            });
          });
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.targetWidth(TargetWidth.AtLeastNarrow)
          .column(Width.Stretch, (c: Column) => {
            c.addColumnSet((innerCs: ColumnSet) => {
              innerCs
                .targetWidth(TargetWidth.AtLeastStandard)
                .column(Width.Auto, (col: Column) => {
                  col.addIcon('Megaphone', (i: Icon) => {
                    i.style(IconStyle.Filled)
                      .size(IconSize.XxSmall)
                      .color(Colors.Accent);
                  });
                })
                .column(Width.Stretch, (col: Column) => {
                  col
                    .spacing(Spacing.Small)
                    .addTextBlock('Posted in Employee Deals', (t: TextBlock) => {
                      t.isSubtle(true).size(TextSize.Small).wrap(true);
                    });
                });
            })
              .addColumnSet((innerCs: ColumnSet) => {
                innerCs
                  .targetWidth(TargetWidth.AtLeastStandard)
                  .column(Width.Auto, (col: Column) => {
                    col.addImage(avatarUrl, (img: Image) => {
                      img
                        .height(Height.Auto)
                        .altText('Avatar of Laurence Gibertson');
                    });
                  })
                  .column(Width.Stretch, (col: Column) => {
                    col
                      .addTextBlock('Laurence Gibertson', (t: TextBlock) => {
                        t.weight(TextWeight.Bolder).wrap(true);
                      })
                      .addTextBlock('Oct 22', (t: TextBlock) => {
                        t.isSubtle(true)
                          .size(TextSize.Small)
                          .wrap(true)
                          .spacing(Spacing.None);
                      });
                  });
              })
              .addTextBlock(
                'Hawaii holiday escape deals start tonight!',
                (t: TextBlock) => {
                  t.size(TextSize.Large)
                    .weight(TextWeight.Bolder)
                    .wrap(true)
                    .spacing(Spacing.Small);
                },
              )
              .addTextBlock(
                'For a limited time, you can book a four night stay at luxury resort on the island of Maui for only $999 per person.',
                (t: TextBlock) => {
                  t.wrap(true).spacing(Spacing.Small).maxLines(3);
                },
              )
              .addColumnSet((innerCs: ColumnSet) => {
                innerCs
                  .height(Height.Stretch)
                  .spacing(Spacing.ExtraLarge)
                  .column(Width.Auto, (col: Column) => {
                    col
                      .verticalContentAlignment(VerticalAlignment.Bottom)
                      .spacing(Spacing.None)
                      .addIcon('ThumbLike', (i: Icon) => {
                        i.horizontalAlignment(HorizontalAlignment.Right)
                          .id('likeOutline')
                          .size(IconSize.XxSmall);
                      })
                      .addIcon('ThumbLike', (i: Icon) => {
                        i.horizontalAlignment(HorizontalAlignment.Right)
                          .id('likeFilled')
                          .style(IconStyle.Filled)
                          .size(IconSize.XxSmall)
                          .isVisible(false);
                      });
                  })
                  .column(Width.Stretch, (col: Column) => {
                    col
                      .verticalContentAlignment(VerticalAlignment.Bottom)
                      .spacing(Spacing.Small)
                      .addTextBlock('26 people like this', (t: TextBlock) => {
                        t.size(TextSize.Small).wrap(true).id('commentLike');
                      })
                      .addTextBlock('27 people like this', (t: TextBlock) => {
                        t.size(TextSize.Small)
                          .wrap(true)
                          .id('commentUnlike')
                          .isVisible(false);
                      });
                  });
              });
          })
          .column(Width.Auto, (c: Column) => {
            c.addImage(heroImageUrl, (img: Image) => {
              img
                .targetWidth(TargetWidth.AtLeastStandard)
                .width('150px')
                .height(Height.Auto)
                .altText('Beach Image')
                .style(ImageStyle.RoundedCorners);
            })
              .addImage(heroImageUrl, (img: Image) => {
                img
                  .targetWidth(TargetWidth.Narrow)
                  .width('100px')
                  .height(Height.Auto)
                  .altText('Beach Image')
                  .style(ImageStyle.RoundedCorners);
              })
              .addActionSet((as: ActionSet) => {
                as.targetWidth(TargetWidth.AtLeastStandard)
                  .spacing(Spacing.Medium)
                  .addActions(
                    ToggleVisibilityAction.make('Like').targetElements(
                      toggleTargets,
                    ),
                  )
                  .addActions(SubmitAction.make('Comment'));
              });
          });
      })
      .addContainer((container: Container) => {
        container
          .targetWidth(TargetWidth.VeryNarrow)
          .addColumnSet((cs: ColumnSet) => {
            cs.column(Width.Auto, (col: Column) => {
              col.addIcon('Megaphone', (i: Icon) => {
                i.style(IconStyle.Filled)
                  .size(IconSize.XxSmall)
                  .color(Colors.Accent);
              });
            }).column(Width.Stretch, (col: Column) => {
              col
                .spacing(Spacing.Small)
                .addTextBlock('Posted in Employee Deals', (t: TextBlock) => {
                  t.isSubtle(true).size(TextSize.Small).wrap(true);
                });
            });
          })
          .addColumnSet((cs: ColumnSet) => {
            cs.column(Width.Auto, (col: Column) => {
              col.addImage(avatarUrl, (img: Image) => {
                img
                  .height(Height.Auto)
                  .altText('Avatar of Laurence Gibertson');
              });
            }).column(Width.Stretch, (col: Column) => {
              col
                .addTextBlock('Laurence Gibertson', (t: TextBlock) => {
                  t.weight(TextWeight.Bolder).wrap(true);
                })
                .addTextBlock('Oct 22', (t: TextBlock) => {
                  t.isSubtle(true)
                    .size(TextSize.Small)
                    .wrap(true)
                    .spacing(Spacing.None);
                });
            });
          })
          .addTextBlock(
            'Hawaii holiday escape deals start tonight!',
            (t: TextBlock) => {
              t.size(TextSize.Large)
                .weight(TextWeight.Bolder)
                .wrap(true)
                .spacing(Spacing.Small);
            },
          )
          .addColumnSet((cs: ColumnSet) => {
            cs.column(Width.Stretch, (col: Column) => {
              col.addTextBlock(
                'For a limited time, you can book a four night stay at luxury resort on the island of Maui for only $999 per person.',
                (t: TextBlock) => {
                  t.maxLines(4).wrap(true).spacing(Spacing.Small);
                },
              );
            }).column(Width.Auto, (col: Column) => {
              col.addImage(heroImageUrl, (img: Image) => {
                img.width('60px').style(ImageStyle.RoundedCorners);
              });
            });
          })
          .addColumnSet((cs: ColumnSet) => {
            cs.spacing(Spacing.ExtraLarge)
              .column(Width.Auto, (col: Column) => {
                col
                  .verticalContentAlignment(VerticalAlignment.Center)
                  .spacing(Spacing.None)
                  .addIcon('ThumbLike', (i: Icon) => {
                    i.horizontalAlignment(HorizontalAlignment.Right)
                      .id('likeOutline2')
                      .size(IconSize.XxSmall);
                  })
                  .addIcon('ThumbLike', (i: Icon) => {
                    i.horizontalAlignment(HorizontalAlignment.Right)
                      .id('likeFilled2')
                      .style(IconStyle.Filled)
                      .size(IconSize.XxSmall)
                      .isVisible(false);
                  });
              })
              .column(Width.Stretch, (col: Column) => {
                col
                  .verticalContentAlignment(VerticalAlignment.Center)
                  .spacing(Spacing.Small)
                  .addTextBlock('26 people like this', (t: TextBlock) => {
                    t.size(TextSize.Small).wrap(true).id('commentLike2');
                  })
                  .addTextBlock('27 people like this', (t: TextBlock) => {
                    t.size(TextSize.Small)
                      .wrap(true)
                      .id('commentUnlike2')
                      .isVisible(false);
                  });
              });
          });
      })
      .addActionSet((as: ActionSet) => {
        as.targetWidth(TargetWidth.AtMostNarrow)
          .spacing(Spacing.Medium)
          .addActions(
            ToggleVisibilityAction.make('Like').targetElements(toggleTargets),
          )
          .addActions(SubmitAction.make('Comment'));
      });

    assertMatchesFixture(card, '3-social-post-hawaii-holiday-deals');
  });

  test('build Course Video Card (4-course-video-intro-to-graphic-design)', () => {
    const toggleTargets = [
      TargetElement.make('truncatedText'),
      TargetElement.make('fullText'),
      TargetElement.make('showMore'),
      TargetElement.make('showLess'),
    ];

    const card = AdaptiveCard.make('1.6')
      .schema('https://adaptivecards.io/schemas/adaptive-card.json')
      .speak('Intro to graphic design, concepts video')
      .addImage(
        'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/course-video/assets/video_image.png',
        (img: Image) => {
          img
            .selectAction(
              OpenUrlAction.make('https://adaptivecards.io/').tooltip(
                'Intro to Graphic Design: Concepts Video',
              ),
            )
            .style(ImageStyle.RoundedCorners);
        },
      )
      .addTextBlock('Intro to Graphic Design: Concepts', (t: TextBlock) => {
        t.wrap(true).size(TextSize.Large).weight(TextWeight.Bolder);
      })
      .addRating(4, 5, (r: Rating) => {
        r.count(1160)
          .color(RatingColor.Marigold)
          .size(RatingSize.Medium)
          .fallback(TextBlock.make('4 Stars · 1,160').spacing(Spacing.None))
          .spacing(Spacing.None);
      })
      .addTextBlock('Course · 52m · Beginner', (t: TextBlock) => {
        t.wrap(true).isSubtle(true).spacing(Spacing.Small);
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.spacing(Spacing.None)
          .column(Width.Auto, (c: Column) => {
            c.horizontalAlignment(HorizontalAlignment.Center)
              .verticalContentAlignment(VerticalAlignment.Center)
              .addImage(
                'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/course-video/assets/logo_image.png',
                (img: Image) => {
                  img.width('16px').height('16px').altText('Logo');
                },
              );
          })
          .column(Width.Auto, (c: Column) => {
            c.spacing(Spacing.Small)
              .verticalContentAlignment(VerticalAlignment.Center)
              .addTextBlock('Sketchpad Scholars', (t: TextBlock) => {
                t.wrap(true).weight(TextWeight.Bolder);
              });
          })
          .column(Width.Auto, (c: Column) => {
            c.targetWidth(TargetWidth.AtLeastStandard)
              .spacing(Spacing.Small)
              .verticalContentAlignment(VerticalAlignment.Center)
              .addTextBlock('·');
          })
          .column(Width.Auto, (c: Column) => {
            c.targetWidth(TargetWidth.AtLeastStandard)
              .spacing(Spacing.Small)
              .verticalContentAlignment(VerticalAlignment.Center)
              .addTextBlock('Tony Harper', (t: TextBlock) => {
                t.wrap(true);
              });
          });
      })
      .addTextBlock(
        "This course is designed to equip you with an understanding of the key principles and tools necessary for creating compelling designs. You'll gain practical experience with creative software and learn...",
        (t: TextBlock) => {
          t.targetWidth(TargetWidth.AtLeastNarrow)
            .wrap(true)
            .id('truncatedText');
        },
      )
      .addTextBlock(
        "This course is designed to equip you with an understanding of the key principles and tools necessary for creating compelling designs. You'll gain practical experience with creative software and learn about design principles through hands-on projects that will help build your portfolio. Enroll now and start your journey to mastering the art of graphic design.",
        (t: TextBlock) => {
          t.targetWidth(TargetWidth.AtLeastNarrow)
            .wrap(true)
            .isVisible(false)
            .id('fullText');
        },
      )
      .addRichTextBlock((rtb: RichTextBlock) => {
        rtb
          .id('showMore')
          .targetWidth(TargetWidth.AtLeastNarrow)
          .spacing(Spacing.None)
          .addInlines(
            TextRun.make('Show more').selectAction(
              ToggleVisibilityAction.make().targetElements(toggleTargets),
            ),
          );
      })
      .addRichTextBlock((rtb: RichTextBlock) => {
        rtb
          .id('showLess')
          .targetWidth(TargetWidth.AtLeastNarrow)
          .spacing(Spacing.None)
          .isVisible(false)
          .addInlines(
            TextRun.make('Show less').selectAction(
              ToggleVisibilityAction.make().targetElements(toggleTargets),
            ),
          );
      })
      .addActionSet((as: ActionSet) => {
        as.spacing(Spacing.Large)
          .targetWidth(TargetWidth.AtLeastNarrow)
          .addActions(OpenUrlAction.make('https://adaptivecards.io/', 'Open'))
          .addActions(
            ExecuteAction.make('Bookmark').iconUrl('icon:Bookmark'),
          );
      })
      .addActionSet((as: ActionSet) => {
        as.spacing(Spacing.Large)
          .targetWidth(TargetWidth.VeryNarrow)
          .addActions(OpenUrlAction.make('https://adaptivecards.io/', 'Open'))
          .addActions(ExecuteAction.make().iconUrl('icon:Bookmark'));
      });

    assertMatchesFixture(card, '4-course-video-intro-to-graphic-design');
  });

  test('build Issue Card (5-issue-ssp-98-performance-optimization)', () => {
    const card = AdaptiveCard.make('1.6')
      .schema('https://adaptivecards.io/schemas/adaptive-card.json')
      .speak('Version 2.2 performance optimization')
      .addRichTextBlock((rtb: RichTextBlock) => {
        rtb.addInlines(
          TextRun.make('Android Scrum Project / SSP-98')
            .size(TextSize.Small)
            .selectAction(OpenUrlAction.make('https://adaptivecards.io')),
        );
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.spacing(Spacing.Small)
          .column(Width.Auto, (c: Column) => {
            c.addIcon('Branch', (icon: Icon) => {
              icon.color(Colors.Accent);
            });
          })
          .column(Width.Stretch, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Center)
              .spacing(Spacing.Small)
              .addTextBlock(
                'Version 2.2 Performance Optimization',
                (t: TextBlock) => {
                  t.size(TextSize.Large).weight(TextWeight.Bolder).wrap(true);
                },
              );
          });
      })
      .addTable((table: Table) => {
        table
          .targetWidth(TargetWidth.AtLeastNarrow)
          .addColumns(TableColumnDefinition.make(1))
          .addColumns(TableColumnDefinition.make(2))
          .addRows(
            TableRow.make()
              .addCells(
                TableCell.make()
                  .verticalContentAlignment(VerticalAlignment.Center)
                  .addTextBlock('Status', (t: TextBlock) => {
                    t.wrap(true).weight(TextWeight.Bolder);
                  }),
              )
              .addCells(
                TableCell.make()
                  .verticalContentAlignment(VerticalAlignment.Center)
                  .addTextBlock('Waiting for Review', (t: TextBlock) => {
                    t.wrap(true);
                  }),
              ),
          )
          .addRows(
            TableRow.make()
              .addCells(
                TableCell.make().addTextBlock('Due Date', (t: TextBlock) => {
                  t.wrap(true).weight(TextWeight.Bolder);
                }),
              )
              .addCells(
                TableCell.make().addTextBlock('May 21, 2023', (t: TextBlock) => {
                  t.wrap(true);
                }),
              ),
          )
          .addRows(
            TableRow.make()
              .addCells(
                TableCell.make()
                  .verticalContentAlignment(VerticalAlignment.Center)
                  .addTextBlock('Priority', (t: TextBlock) => {
                    t.wrap(true).weight(TextWeight.Bolder);
                  }),
              )
              .addCells(
                TableCell.make()
                  .verticalContentAlignment(VerticalAlignment.Center)
                  .addColumnSet((cs: ColumnSet) => {
                    cs.spacing(Spacing.Small)
                      .column(Width.Auto, (c: Column) => {
                        c.addIcon('Flag', (icon: Icon) => {
                          icon
                            .color(Colors.Attention)
                            .size(IconSize.XSmall)
                            .horizontalAlignment(HorizontalAlignment.Center);
                        });
                      })
                      .column(Width.Stretch, (c: Column) => {
                        c.spacing(Spacing.Small).addTextBlock(
                          'Critical',
                          (t: TextBlock) => {
                            t.color(Colors.Attention)
                              .wrap(true)
                              .spacing(Spacing.Small);
                          },
                        );
                      });
                  }),
              ),
          )
          .addRows(
            TableRow.make()
              .addCells(
                TableCell.make()
                  .verticalContentAlignment(VerticalAlignment.Center)
                  .addTextBlock('Assigned To', (t: TextBlock) => {
                    t.wrap(true).weight(TextWeight.Bolder);
                  }),
              )
              .addCells(
                TableCell.make().addColumnSet((cs: ColumnSet) => {
                  cs.column(Width.Auto, (c: Column) => {
                    c.verticalContentAlignment(VerticalAlignment.Center)
                      .horizontalAlignment(HorizontalAlignment.Center)
                      .addImage(
                        'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/issue/assets/avatar.png',
                        (img: Image) => {
                          img.width('16px');
                        },
                      );
                  }).column(Width.Stretch, (c: Column) => {
                    c.spacing(Spacing.Small).addTextBlock(
                      'Charlotte Waltson',
                      (t: TextBlock) => {
                        t.wrap(true);
                      },
                    );
                  });
                }),
              ),
          )
          .firstRowAsHeaders(false)
          .showGridLines(false);
      })
      .addContainer((cont: Container) => {
        cont
          .targetWidth(TargetWidth.VeryNarrow)
          .addTextBlock('Status', (t: TextBlock) => {
            t.weight(TextWeight.Bolder).wrap(true);
          })
          .addTextBlock('Waiting for Review', (t: TextBlock) => {
            t.wrap(true).spacing(Spacing.None);
          })
          .addTextBlock('Due Date', (t: TextBlock) => {
            t.weight(TextWeight.Bolder).wrap(true).spacing(Spacing.Small);
          })
          .addTextBlock('May 21, 2023', (t: TextBlock) => {
            t.wrap(true).spacing(Spacing.None);
          })
          .addTextBlock('Priority', (t: TextBlock) => {
            t.weight(TextWeight.Bolder).wrap(true).spacing(Spacing.Small);
          })
          .addColumnSet((cs: ColumnSet) => {
            cs.spacing(Spacing.None)
              .column(Width.Auto, (c: Column) => {
                c.verticalContentAlignment(VerticalAlignment.Center).addIcon(
                  'Flag',
                  (icon: Icon) => {
                    icon
                      .color(Colors.Attention)
                      .size(IconSize.XSmall)
                      .horizontalAlignment(HorizontalAlignment.Center);
                  },
                );
              })
              .column(Width.Stretch, (c: Column) => {
                c.spacing(Spacing.Small).addTextBlock(
                  'Critical',
                  (t: TextBlock) => {
                    t.color(Colors.Attention)
                      .wrap(true)
                      .spacing(Spacing.Small);
                  },
                );
              });
          })
          .addTextBlock('Assigned To', (t: TextBlock) => {
            t.weight(TextWeight.Bolder).wrap(true).spacing(Spacing.Small);
          })
          .addColumnSet((cs: ColumnSet) => {
            cs.spacing(Spacing.None)
              .column(Width.Auto, (c: Column) => {
                c.verticalContentAlignment(VerticalAlignment.Center)
                  .horizontalAlignment(HorizontalAlignment.Center)
                  .addImage(
                    'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/issue/assets/avatar.png',
                    (img: Image) => {
                      img.width('16px');
                    },
                  );
              })
              .column(Width.Stretch, (c: Column) => {
                c.spacing(Spacing.Small).addTextBlock(
                  'Charlotte Waltson',
                  (t: TextBlock) => {
                    t.wrap(true);
                  },
                );
              });
          });
      })
      .addActionSet((as: ActionSet) => {
        as.spacing(Spacing.ExtraLarge)
          .targetWidth(TargetWidth.AtLeastNarrow)
          .addActions(
            OpenUrlAction.make('https://adaptivecards.io/', 'Comment'),
          )
          .addActions(
            OpenUrlAction.make('https://adaptivecards.io/', 'Edit Issue'),
          );
      })
      .addActionSet((as: ActionSet) => {
        as.spacing(Spacing.ExtraLarge)
          .targetWidth(TargetWidth.VeryNarrow)
          .addActions(
            OpenUrlAction.make('https://adaptivecards.io/', 'Comment'),
          )
          .addActions(
            OpenUrlAction.make('https://adaptivecards.io/').iconUrl(
              'icon:Edit',
            ),
          );
      });

    assertMatchesFixture(card, '5-issue-ssp-98-performance-optimization');
  });

  test('build Weekly Picks Card (6-weekly-picks-learning-recommendations)', () => {
    const assets =
      'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/list/assets/';

    const toggleTargets: Record<string, TargetElement[]> = {
      content1AndContent2: [
        TargetElement.make('content1'),
        TargetElement.make('content2'),
      ],
      content1AndContent3: [
        TargetElement.make('content1'),
        TargetElement.make('content3'),
      ],
      content2AndContent3: [
        TargetElement.make('content2'),
        TargetElement.make('content3'),
      ],
    };

    const toggle = (targets: TargetElement[]): ToggleVisibilityAction =>
      ToggleVisibilityAction.make().targetElements(targets);

    interface PageConfig {
      id: string;
      isVisible: boolean;
      image: string;
      title: string;
      meta: string;
      activeDot: number;
      previous: string;
      next: string;
      dots: Array<string | null>;
    }

    const makePage = (config: PageConfig): Container => {
      const page = new Container().id(config.id);

      page
        .addContainer((cover: Container) => {
          cover
            .backgroundImage(
              BackgroundImage.make(assets + config.image)
                .verticalAlignment(VerticalAlignment.Center)
                .horizontalAlignment(HorizontalAlignment.Center),
            )
            .bleed(true)
            .minHeight('128px')
            .addItems(TextBlock.make())
            .selectAction(OpenUrlAction.make('https://adaptivecards.io/'));
        })
        .addColumnSet((cs: ColumnSet) => {
          cs.horizontalAlignment(HorizontalAlignment.Center).column(
            Width.Stretch,
            (c: Column) => {
              c.horizontalAlignment(HorizontalAlignment.Center)
                .verticalContentAlignment(VerticalAlignment.Center)
                .addIcon('ChevronLeft', (i: Icon) => {
                  i.color(Colors.Accent)
                    .size(IconSize.XSmall)
                    .horizontalAlignment(HorizontalAlignment.Right)
                    .selectAction(toggle(toggleTargets[config.previous]!));
                });
            },
          );

          config.dots.forEach((targetKey, index) => {
            const isActive = index === config.activeDot;

            cs.column(Width.Auto, (c: Column) => {
              c.verticalContentAlignment(VerticalAlignment.Center).addIcon(
                'CircleSmall',
                (i: Icon) => {
                  i.color(Colors.Accent)
                    .size(IconSize.Small)
                    .horizontalAlignment(HorizontalAlignment.Center);

                  if (isActive) {
                    i.style(IconStyle.Filled);
                  } else if (targetKey !== null) {
                    i.selectAction(toggle(toggleTargets[targetKey]!));
                  }
                },
              );
            });
          });

          cs.column(Width.Stretch, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Center).addIcon(
              'ChevronRight',
              (i: Icon) => {
                i.color(Colors.Accent)
                  .size(IconSize.XSmall)
                  .horizontalAlignment(HorizontalAlignment.Left)
                  .selectAction(toggle(toggleTargets[config.next]!));
              },
            );
          });
        })
        .addTextBlock(config.title, (t: TextBlock) => {
          t.weight(TextWeight.Bolder)
            .wrap(true)
            .horizontalAlignment(HorizontalAlignment.Center);
        })
        .addTextBlock(config.meta, (t: TextBlock) => {
          t.isSubtle(true)
            .size(TextSize.Small)
            .wrap(true)
            .spacing(Spacing.None)
            .horizontalAlignment(HorizontalAlignment.Center);
        });

      if (!config.isVisible) {
        page.isVisible(false);
      }

      return page;
    };

    const features = [
      {
        image: 'ResourceImage_1.png',
        altText: 'Zenith Health Video',
        meta: 'Video · 12min',
        title:
          'Why You Should Take a Break from Screen Time and Enjoy Nature',
        author: 'Zenith Health',
        spacing: Spacing.Medium,
      },
      {
        image: 'ResourceImage_2.png',
        altText: 'Emma Jones Article',
        meta: 'Article · 5min',
        title: 'Stay Healthy and Productive Working from Home',
        author: 'Emma Jones',
        spacing: Spacing.Small,
      },
      {
        image: 'ResourceImage_3.png',
        altText: 'Insightia Course',
        meta: 'Course · 30min',
        title:
          'Productivity Mastery: How to Optimize Your Energy, Focus and Motivation',
        author: 'Insightia',
        spacing: Spacing.Small,
      },
    ];

    const pages: PageConfig[] = [
      {
        id: 'content1',
        isVisible: true,
        image: 'ResourceImage_1_Horizontal.png',
        title:
          'Why You Should Take a Break from Screen Time and Enjoy Nature',
        meta: 'Video · 12min',
        activeDot: 0,
        previous: 'content1AndContent3',
        next: 'content1AndContent2',
        dots: [null, 'content1AndContent2', 'content1AndContent3'],
      },
      {
        id: 'content2',
        isVisible: false,
        image: 'ResourceImage_2_Horizontal.png',
        title: 'Stay Healthy and Productive Working from Home',
        meta: 'Article · 5min',
        activeDot: 1,
        previous: 'content1AndContent2',
        next: 'content2AndContent3',
        dots: ['content1AndContent2', null, 'content2AndContent3'],
      },
      {
        id: 'content3',
        isVisible: false,
        image: 'ResourceImage_3_Horizontal.png',
        title:
          'Productivity Mastery: How to Optimize Your Energy, Focus, and Motivation',
        meta: 'Course · 30min',
        activeDot: 2,
        previous: 'content2AndContent3',
        next: 'content1AndContent3',
        dots: ['content1AndContent3', 'content2AndContent3', null],
      },
    ];

    const card = AdaptiveCard.make('1.6')
      .schema('https://adaptivecards.io/schemas/adaptive-card.json')
      .speak('Robin, explore your weekly picks')
      .addTextBlock('Robin, explore your weekly picks', (t: TextBlock) => {
        t.size(TextSize.Large).weight(TextWeight.Bolder).wrap(true);
      })
      .addTextBlock(
        'These resources will teach you how to achieve balance in your life and work with more ease.',
        (t: TextBlock) => {
          t.wrap(true)
            .targetWidth(TargetWidth.AtLeastNarrow)
            .spacing(Spacing.Small);
        },
      );

    for (const feature of features) {
      card.addContainer((cont: Container) => {
        cont
          .style(ContainerStyle.Emphasis)
          .spacing(feature.spacing)
          .targetWidth(TargetWidth.AtLeastNarrow)
          .addColumnSet((cs: ColumnSet) => {
            cs.column(Width.Auto, (c: Column) => {
              c.addImage(assets + feature.image, (img: Image) => {
                img
                  .width('56px')
                  .height('56px')
                  .altText(feature.altText)
                  .style(ImageStyle.RoundedCorners);
              });
            }).column(Width.Stretch, (c: Column) => {
              c.addTextBlock(feature.meta, (t: TextBlock) => {
                t.isSubtle(true).size(TextSize.Small).wrap(true);
              })
                .addTextBlock(feature.title, (t: TextBlock) => {
                  t.weight(TextWeight.Bolder).wrap(true).spacing(Spacing.None);
                })
                .addTextBlock(feature.author, (t: TextBlock) => {
                  t.wrap(true).spacing(Spacing.None);
                });
            });
          })
          .selectAction(OpenUrlAction.make('https://adaptivecards.io/'))
          .roundedCorners(true)
          .showBorder(true);
      });
    }

    card
      .addContainer((cont: Container) => {
        cont
          .targetWidth(TargetWidth.VeryNarrow)
          .addTextBlock(
            'Learn how to achieve balance in life and work.',
            (t: TextBlock) => {
              t.wrap(true);
            },
          );

        for (const page of pages) {
          cont.addItems(makePage(page));
        }
      })
      .addActionSet((as: ActionSet) => {
        as.spacing(Spacing.Medium)
          .addActions(
            OpenUrlAction.make('https://adaptivecards.io/', 'Open Zenergy'),
          )
          .addActions(SubmitAction.make('Remind me').iconUrl('icon:Clock'));
      });

    assertMatchesFixture(card, '6-weekly-picks-learning-recommendations');
  });

  test('build Recipe Card (7-recipe-apricot-chile-glazed-chicken)', () => {
    const imageUrl =
      'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Adaptive-Card-Samples/refs/heads/main/samples/recipe/assets/recipe_image.png';
    const recipeUrl =
      'https://www.tasteofhome.com/recipes/spicy-apricot-glazed-chicken/';

    const firstParagraph =
      'This sweet apricot-chile glazed broccoli recipe marries fruit and chiles to make this dish mouthwateringly special. Use organic jam in place of preserves for a smoother, prettier glaze if you are into spicy food, then this will be right up your alley.';
    const secondParagraph =
      "The recipe calls for 1/4 cup of the chili sauce which gives the chicken quite a bite on the palate. But for all you heat lovers, it's definitely a good feel.";
    const truncatedText = `${firstParagraph}\n\n${secondParagraph}`;

    const toggleTargets = [
      TargetElement.make('truncatedText'),
      TargetElement.make('fullText1'),
      TargetElement.make('fullText2'),
      TargetElement.make('showMore'),
      TargetElement.make('showLess'),
    ];

    const createToggleAction = (): ToggleVisibilityAction =>
      ToggleVisibilityAction.make().targetElements(toggleTargets);

    const card = AdaptiveCard.make('1.6')
      .schema('https://adaptivecards.io/schemas/adaptive-card.json')
      .speak('Apricot-chile glazed chicken recipe')
      .addImage(imageUrl, (img: Image) => {
        img
          .altText('Image of Apricot-Chile Glazed Chicken')
          .size(ImageSize.Stretch)
          .style(ImageStyle.RoundedCorners);
      })
      .addTextBlock('Apricot-Chile Glazed Chicken', (t: TextBlock) => {
        t.wrap(true)
          .size(TextSize.Large)
          .weight(TextWeight.Bolder)
          .color(Colors.Default);
      })
      .addTextBlock('15 min · 215 calories · 29g protein', (t: TextBlock) => {
        t.wrap(true)
          .spacing(Spacing.None)
          .fontType(FontType.Default)
          .size(TextSize.Small)
          .weight(TextWeight.Default)
          .isSubtle(true)
          .color(Colors.Default);
      })
      .addTextBlock(truncatedText, (t: TextBlock) => {
        t.id('truncatedText').wrap(true).maxLines(3);
      })
      .addTextBlock(firstParagraph, (t: TextBlock) => {
        t.id('fullText1').wrap(true).isVisible(false);
      })
      .addTextBlock(secondParagraph, (t: TextBlock) => {
        t.id('fullText2').wrap(true).isVisible(false);
      })
      .addRichTextBlock((rtb: RichTextBlock) => {
        rtb
          .id('showMore')
          .targetWidth(TargetWidth.AtLeastNarrow)
          .addInlines(
            TextRun.make('Show more').selectAction(createToggleAction()),
          );
      })
      .addRichTextBlock((rtb: RichTextBlock) => {
        rtb
          .id('showLess')
          .targetWidth(TargetWidth.AtLeastNarrow)
          .isVisible(false)
          .addInlines(
            TextRun.make('Show less').selectAction(createToggleAction()),
          );
      })
      .addActionSet((as: ActionSet) => {
        as.targetWidth(TargetWidth.AtLeastNarrow)
          .addActions(OpenUrlAction.make(recipeUrl, 'View recipe'))
          .addActions(SubmitAction.make('Add to cart').iconUrl('icon:Cart'))
          .spacing(Spacing.Medium);
      })
      .addActionSet((as: ActionSet) => {
        as.targetWidth(TargetWidth.VeryNarrow)
          .addActions(OpenUrlAction.make(recipeUrl, 'View recipe'))
          .addActions(SubmitAction.make().iconUrl('icon:Cart'))
          .spacing(Spacing.Medium);
      });

    assertMatchesFixture(card, '7-recipe-apricot-chile-glazed-chicken');
  });

  test('build Web Development Bootcamp Video Card (8-video-web-development-bootcamp)', () => {
    const card = AdaptiveCard.make('1.6')
      .schema('https://adaptivecards.io/schemas/adaptive-card.json')
      .speak('Web development bootcamp video')
      .addImage(
        'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/standard-video/assets/video_image.png',
        (img: Image) => {
          img
            .altText('Web Development Bootcamp Video')
            .style(ImageStyle.RoundedCorners);
        },
      )
      .addTextBlock('Web Development Bootcamp', (t: TextBlock) => {
        t.wrap(true).size(TextSize.Large).weight(TextWeight.Bolder);
      })
      .addTextBlock('HackLab Films', (t: TextBlock) => {
        t.wrap(true).spacing(Spacing.Small).weight(TextWeight.Bolder);
      })
      .addTextBlock('24m · 17.1M views · 2 months ago', (t: TextBlock) => {
        t.wrap(true).spacing(Spacing.None);
      })
      .addActionSet((as: ActionSet) => {
        as.targetWidth(TargetWidth.AtLeastNarrow)
          .addActions(OpenUrlAction.make('https://adaptivecards.io/', 'Open'))
          .addActions(
            OpenUrlAction.make(
              'https://adaptivecards.io/',
              'Add to calendar',
            ).iconUrl('icon:Calendar'),
          )
          .addActions(
            OpenUrlAction.make('https://adaptivecards.io/', 'Share in Teams')
              .mode(ActionMode.Secondary)
              .iconUrl('icon:PeopleTeam'),
          )
          .addActions(
            OpenUrlAction.make('https://adaptivecards.io/', 'Download')
              .mode(ActionMode.Secondary)
              .iconUrl('icon:ArrowDown'),
          )
          .addActions(
            OpenUrlAction.make('https://adaptivecards.io/', 'Copy link')
              .mode(ActionMode.Secondary)
              .iconUrl('icon:Link'),
          );
      })
      .addActionSet((as: ActionSet) => {
        as.targetWidth(TargetWidth.VeryNarrow)
          .addActions(OpenUrlAction.make('https://adaptivecards.io/', 'Open'))
          .addActions(
            OpenUrlAction.make('https://adaptivecards.io/').iconUrl(
              'icon:Calendar',
            ),
          )
          .addActions(
            OpenUrlAction.make('https://adaptivecards.io/', 'Share in Teams')
              .iconUrl('icon:PeopleTeam')
              .mode(ActionMode.Secondary),
          )
          .addActions(
            OpenUrlAction.make('https://adaptivecards.io/', 'Download')
              .iconUrl('icon:ArrowDown')
              .mode(ActionMode.Secondary),
          )
          .addActions(
            OpenUrlAction.make('https://adaptivecards.io/', 'Copy link')
              .iconUrl('icon:Link')
              .mode(ActionMode.Secondary),
          );
      });

    assertMatchesFixture(card, '8-video-web-development-bootcamp');
  });

  test('build Bug 2837 Icons Not Rendering In Dark Mode Card (9-bug-2837-dark-mode-icons)', () => {
    const card = AdaptiveCard.make('1.6')
      .schema('https://adaptivecards.io/schemas/adaptive-card.json')
      .speak('Bug 2837, icons not rendering in dark mode')
      .addColumnSet((cs: ColumnSet) => {
        cs.column(Width.Auto, (c: Column) => {
          c.addImage(
            'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/work_item/assets/thumb_image.png',
            (img: Image) => {
              img
                .width('56px')
                .height('56px')
                .altText('Logo')
                .style(ImageStyle.RoundedCorners);
            },
          );
        }).column(Width.Stretch, (c: Column) => {
          c.addTextBlock(
            'Bug 2837 - Icons not rendering in dark mode',
            (t: TextBlock) => {
              t.wrap(true).weight(TextWeight.Bolder);
            },
          ).addColumnSet((innerCs: ColumnSet) => {
            innerCs
              .targetWidth(TargetWidth.AtLeastStandard)
              .column(Width.Auto, (col: Column) => {
                col
                  .horizontalAlignment(HorizontalAlignment.Center)
                  .verticalContentAlignment(VerticalAlignment.Center)
                  .addIcon('CircleSmall', (i: Icon) => {
                    i.color(Colors.Attention)
                      .style(IconStyle.Filled)
                      .size(IconSize.Small);
                  });
              })
              .column(Width.Auto, (col: Column) => {
                col
                  .spacing(Spacing.None)
                  .verticalContentAlignment(VerticalAlignment.Center)
                  .addTextBlock('Blocked', (t: TextBlock) => {
                    t.wrap(true);
                  });
              })
              .column(Width.Auto, (col: Column) => {
                col
                  .spacing(Spacing.Small)
                  .verticalContentAlignment(VerticalAlignment.Center)
                  .addTextBlock('|', (t: TextBlock) => {
                    t.wrap(true);
                  });
              })
              .column(Width.Auto, (col: Column) => {
                col
                  .spacing(Spacing.Small)
                  .verticalContentAlignment(VerticalAlignment.Center)
                  .addTextBlock('Hugo Gonzalez', (t: TextBlock) => {
                    t.wrap(true);
                  });
              });
          });
        });
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.targetWidth(TargetWidth.Narrow)
          .column(Width.Auto, (c: Column) => {
            c.horizontalAlignment(HorizontalAlignment.Center)
              .verticalContentAlignment(VerticalAlignment.Center)
              .addIcon('CircleSmall', (i: Icon) => {
                i.color(Colors.Attention)
                  .style(IconStyle.Filled)
                  .size(IconSize.Small);
              });
          })
          .column(Width.Auto, (c: Column) => {
            c.spacing(Spacing.None)
              .verticalContentAlignment(VerticalAlignment.Center)
              .addTextBlock('Blocked', (t: TextBlock) => {
                t.wrap(true);
              });
          })
          .column(Width.Auto, (c: Column) => {
            c.spacing(Spacing.Small)
              .verticalContentAlignment(VerticalAlignment.Center)
              .addTextBlock('|', (t: TextBlock) => {
                t.wrap(true);
              });
          })
          .column(Width.Auto, (c: Column) => {
            c.spacing(Spacing.Small)
              .verticalContentAlignment(VerticalAlignment.Center)
              .addTextBlock('Hugo Gonzalez', (t: TextBlock) => {
                t.wrap(true);
              });
          });
      })
      .addContainer((cont: Container) => {
        cont
          .targetWidth(TargetWidth.VeryNarrow)
          .addColumnSet((cs: ColumnSet) => {
            cs.column(Width.Auto, (c: Column) => {
              c.horizontalAlignment(HorizontalAlignment.Center)
                .verticalContentAlignment(VerticalAlignment.Center)
                .addIcon('CircleSmall', (i: Icon) => {
                  i.color(Colors.Attention)
                    .style(IconStyle.Filled)
                    .size(IconSize.Small);
                });
            }).column(Width.Auto, (c: Column) => {
              c.spacing(Spacing.None)
                .verticalContentAlignment(VerticalAlignment.Center)
                .addTextBlock('Blocked', (t: TextBlock) => {
                  t.wrap(true);
                });
            });
          })
          .addTextBlock('Hugo Gonzalez', (t: TextBlock) => {
            t.wrap(true).spacing(Spacing.None);
          });
      })
      .addActionSet((as: ActionSet) => {
        as.addActions(
          OpenUrlAction.make('https://adaptivecards.io/', 'Open'),
        ).addActions(SubmitAction.make('Follow').iconUrl('icon:Eye'));
      });

    assertMatchesFixture(card, '9-bug-2837-dark-mode-icons');
  });

  test('build Time Off Request Card (10-time-off-request-form)', () => {
    const toggleTargets = [
      TargetElement.make('vNarrowBalance'),
      TargetElement.make('balanceDown'),
      TargetElement.make('balanceUp'),
    ];

    const createToggleAction = (): ToggleVisibilityAction =>
      ToggleVisibilityAction.make().targetElements(toggleTargets);

    const commentToggleTargets = [
      TargetElement.make('comments'),
      TargetElement.make('chevronUp'),
      TargetElement.make('chevronDown'),
    ];

    const createCommentToggleAction = (): ToggleVisibilityAction =>
      ToggleVisibilityAction.make().targetElements(commentToggleTargets);

    const heroImageUrl =
      'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Adaptive-Card-Samples/main/samples/time-off-request/assets/hero-image-default.png';
    const heroWideImageUrl =
      'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Adaptive-Card-Samples/main/samples/time-off-request/assets/hero-wide.png';

    const card = AdaptiveCard.make('1.6')
      .schema('https://adaptivecards.io/schemas/adaptive-card.json')
      .addTextBlock('Time off request', (t: TextBlock) => {
        t.wrap(true)
          .size(TextSize.Large)
          .weight(TextWeight.Bolder)
          .spacing(Spacing.None);
      })
      .addImage(heroImageUrl, (img: Image) => {
        img
          .style(ImageStyle.RoundedCorners)
          .targetWidth(TargetWidth.AtMostStandard);
      })
      .addImage(heroWideImageUrl, (img: Image) => {
        img
          .targetWidth(TargetWidth.Wide)
          .style(ImageStyle.RoundedCorners);
      })
      .addTextBlock('Current balance', (t: TextBlock) => {
        t.wrap(true)
          .weight(TextWeight.Bolder)
          .color(Colors.Accent)
          .targetWidth(TargetWidth.AtLeastNarrow);
      })
      .addContainer((cont: Container) => {
        cont
          .style(ContainerStyle.Accent)
          .showBorder(true)
          .roundedCorners(true)
          .spacing(Spacing.ExtraSmall)
          .targetWidth(TargetWidth.Wide)
          .horizontalAlignment(HorizontalAlignment.Center)
          .addColumnSet((cs: ColumnSet) => {
            cs.column(Width.Stretch, (c: Column) => {
              c.addTextBlock('24h', (t: TextBlock) => {
                t.wrap(true)
                  .color(Colors.Accent)
                  .size(TextSize.ExtraLarge)
                  .weight(TextWeight.Bolder);
              })
                .addColumnSet((innerCs: ColumnSet) => {
                  innerCs
                    .spacing(Spacing.ExtraSmall)
                    .column(Width.Auto, (col: Column) => {
                      col.addIcon('HeartPulse', (i: Icon) => {
                        i.color(Colors.Accent).size(IconSize.XSmall);
                      });
                    })
                    .column(Width.Auto, (col: Column) => {
                      col
                        .spacing(Spacing.ExtraSmall)
                        .addTextBlock('Sick Days', (t: TextBlock) => {
                          t.wrap(true)
                            .weight(TextWeight.Bolder)
                            .size(TextSize.Default);
                        });
                    });
                })
                .addTextBlock(
                  'Accrued at eight hours per three months.',
                  (t: TextBlock) => {
                    t.wrap(true)
                      .isSubtle(true)
                      .size(TextSize.Small)
                      .spacing(Spacing.ExtraSmall);
                  },
                );
            })
              .column(Width.Stretch, (c: Column) => {
                c.spacing(Spacing.ExtraLarge)
                  .addTextBlock('12h', (t: TextBlock) => {
                    t.wrap(true)
                      .color(Colors.Accent)
                      .size(TextSize.ExtraLarge)
                      .weight(TextWeight.Bolder);
                  })
                  .addColumnSet((innerCs: ColumnSet) => {
                    innerCs
                      .spacing(Spacing.ExtraSmall)
                      .column(Width.Auto, (col: Column) => {
                        col.addIcon('LeafOne', (i: Icon) => {
                          i.color(Colors.Accent).size(IconSize.XSmall);
                        });
                      })
                      .column(Width.Auto, (col: Column) => {
                        col
                          .spacing(Spacing.ExtraSmall)
                          .addTextBlock('Wellness', (t: TextBlock) => {
                            t.wrap(true).weight(TextWeight.Bolder);
                          });
                      });
                  })
                  .addTextBlock(
                    'One time 5 day affordance for the year',
                    (t: TextBlock) => {
                      t.wrap(true)
                        .isSubtle(true)
                        .size(TextSize.Small)
                        .spacing(Spacing.ExtraSmall);
                    },
                  );
              })
              .column(Width.Stretch, (c: Column) => {
                c.spacing(Spacing.ExtraLarge)
                  .addTextBlock('32h', (t: TextBlock) => {
                    t.wrap(true)
                      .color(Colors.Accent)
                      .size(TextSize.ExtraLarge)
                      .weight(TextWeight.Bolder);
                  })
                  .addColumnSet((innerCs: ColumnSet) => {
                    innerCs
                      .spacing(Spacing.ExtraSmall)
                      .column(Width.Auto, (col: Column) => {
                        col.addIcon('Beach', (i: Icon) => {
                          i.color(Colors.Accent).size(IconSize.XSmall);
                        });
                      })
                      .column(Width.Auto, (col: Column) => {
                        col
                          .spacing(Spacing.ExtraSmall)
                          .addTextBlock('Paid time off', (t: TextBlock) => {
                            t.wrap(true).weight(TextWeight.Bolder);
                          });
                      });
                  })
                  .addTextBlock(
                    'Accrued at eight hours per one month.',
                    (t: TextBlock) => {
                      t.wrap(true)
                        .isSubtle(true)
                        .size(TextSize.Small)
                        .spacing(Spacing.ExtraSmall);
                    },
                  );
              });
          });
      })
      .addContainer((cont: Container) => {
        cont
          .style(ContainerStyle.Accent)
          .showBorder(true)
          .roundedCorners(true)
          .spacing(Spacing.ExtraSmall)
          .targetWidth(TargetWidth.Standard)
          .addColumnSet((cs: ColumnSet) => {
            cs.column(Width.Auto, (c: Column) => {
              c.addTextBlock('24h', (t: TextBlock) => {
                t.wrap(true)
                  .color(Colors.Accent)
                  .size(TextSize.ExtraLarge)
                  .weight(TextWeight.Bolder);
              })
                .addColumnSet((innerCs: ColumnSet) => {
                  innerCs
                    .spacing(Spacing.ExtraSmall)
                    .column(Width.Auto, (col: Column) => {
                      col.addIcon('HeartPulse', (i: Icon) => {
                        i.color(Colors.Accent).size(IconSize.XSmall);
                      });
                    })
                    .column(Width.Auto, (col: Column) => {
                      col
                        .spacing(Spacing.ExtraSmall)
                        .addTextBlock('Sick Days', (t: TextBlock) => {
                          t.wrap(true).weight(TextWeight.Bolder);
                        });
                    });
                })
                .addTextBlock(
                  'Accrued at eight hours per three months.',
                  (t: TextBlock) => {
                    t.wrap(true)
                      .isSubtle(true)
                      .size(TextSize.Small)
                      .spacing(Spacing.ExtraSmall);
                  },
                );
            })
              .column(Width.Auto, (c: Column) => {
                c.addTextBlock('12h', (t: TextBlock) => {
                  t.wrap(true)
                    .color(Colors.Accent)
                    .size(TextSize.ExtraLarge)
                    .weight(TextWeight.Bolder);
                })
                  .addColumnSet((innerCs: ColumnSet) => {
                    innerCs
                      .spacing(Spacing.ExtraSmall)
                      .column(Width.Auto, (col: Column) => {
                        col.addIcon('LeafOne', (i: Icon) => {
                          i.color(Colors.Accent).size(IconSize.XSmall);
                        });
                      })
                      .column(Width.Auto, (col: Column) => {
                        col
                          .spacing(Spacing.ExtraSmall)
                          .addTextBlock('Wellness', (t: TextBlock) => {
                            t.wrap(true).weight(TextWeight.Bolder);
                          });
                      });
                  })
                  .addTextBlock(
                    'One time 5 day affordance for the year',
                    (t: TextBlock) => {
                      t.wrap(true)
                        .isSubtle(true)
                        .size(TextSize.Small)
                        .spacing(Spacing.ExtraSmall);
                    },
                  );
              })
              .column(Width.Auto, (c: Column) => {
                c.addTextBlock('32h', (t: TextBlock) => {
                  t.wrap(true)
                    .color(Colors.Accent)
                    .size(TextSize.ExtraLarge)
                    .weight(TextWeight.Bolder);
                })
                  .addColumnSet((innerCs: ColumnSet) => {
                    innerCs
                      .spacing(Spacing.ExtraSmall)
                      .column(Width.Auto, (col: Column) => {
                        col.addIcon('Beach', (i: Icon) => {
                          i.color(Colors.Accent).size(IconSize.XSmall);
                        });
                      })
                      .column(Width.Auto, (col: Column) => {
                        col
                          .spacing(Spacing.ExtraSmall)
                          .addTextBlock('Paid time off', (t: TextBlock) => {
                            t.wrap(true).weight(TextWeight.Bolder);
                          });
                      });
                  })
                  .addTextBlock(
                    'Accrued at eight hours per one month.',
                    (t: TextBlock) => {
                      t.wrap(true)
                        .isSubtle(true)
                        .size(TextSize.Small)
                        .spacing(Spacing.ExtraSmall);
                    },
                  );
              });
          });
      })
      .addContainer((cont: Container) => {
        cont
          .style(ContainerStyle.Accent)
          .showBorder(true)
          .roundedCorners(true)
          .spacing(Spacing.ExtraSmall)
          .targetWidth(TargetWidth.Narrow)
          .horizontalAlignment(HorizontalAlignment.Center)
          .addColumnSet((cs: ColumnSet) => {
            cs.column(Width.Stretch, (c: Column) => {
              c.horizontalAlignment(HorizontalAlignment.Center)
                .addIcon('HeartPulse', (i: Icon) => {
                  i.color(Colors.Accent)
                    .horizontalAlignment(HorizontalAlignment.Center)
                    .size(IconSize.Small);
                })
                .addTextBlock('24h', (t: TextBlock) => {
                  t.wrap(true)
                    .size(TextSize.Large)
                    .color(Colors.Accent)
                    .weight(TextWeight.Bolder)
                    .spacing(Spacing.None);
                })
                .addTextBlock('Sick days', (t: TextBlock) => {
                  t.wrap(true)
                    .weight(TextWeight.Bolder)
                    .spacing(Spacing.None)
                    .size(TextSize.Small)
                    .color(Colors.Default);
                });
            })
              .column(Width.Stretch, (c: Column) => {
                c.horizontalAlignment(HorizontalAlignment.Center)
                  .addIcon('LeafOne', (i: Icon) => {
                    i.color(Colors.Accent)
                      .horizontalAlignment(HorizontalAlignment.Center)
                      .size(IconSize.Small);
                  })
                  .addTextBlock('12h', (t: TextBlock) => {
                    t.wrap(true)
                      .size(TextSize.Large)
                      .color(Colors.Accent)
                      .weight(TextWeight.Bolder)
                      .spacing(Spacing.None);
                  })
                  .addTextBlock('Wellness', (t: TextBlock) => {
                    t.wrap(true)
                      .weight(TextWeight.Bolder)
                      .spacing(Spacing.None)
                      .size(TextSize.Small)
                      .color(Colors.Default);
                  });
              })
              .column(Width.Stretch, (c: Column) => {
                c.horizontalAlignment(HorizontalAlignment.Center)
                  .addIcon('Beach', (i: Icon) => {
                    i.horizontalAlignment(HorizontalAlignment.Center)
                      .color(Colors.Accent)
                      .size(IconSize.Small);
                  })
                  .addTextBlock('32h', (t: TextBlock) => {
                    t.wrap(true)
                      .color(Colors.Accent)
                      .size(TextSize.Large)
                      .weight(TextWeight.Bolder)
                      .spacing(Spacing.None);
                  })
                  .addTextBlock('Paid time off', (t: TextBlock) => {
                    t.wrap(true)
                      .weight(TextWeight.Bolder)
                      .spacing(Spacing.None)
                      .size(TextSize.Small)
                      .color(Colors.Default);
                  });
              });
          });
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.targetWidth(TargetWidth.VeryNarrow)
          .column(Width.Auto, (c: Column) => {
            c.addRichTextBlock((rtb: RichTextBlock) => {
              rtb.addInlines(
                TextRun.make('View current balance').selectAction(
                  createToggleAction(),
                ),
              );
            });
          })
          .column(Width.Auto, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Bottom)
              .spacing(Spacing.ExtraSmall)
              .addIcon('ChevronDown', (i: Icon) => {
                i.size(IconSize.XxSmall)
                  .selectAction(createToggleAction())
                  .color(Colors.Accent)
                  .id('balanceDown');
              })
              .addIcon('ChevronUp', (i: Icon) => {
                i.isVisible(false)
                  .id('balanceUp')
                  .size(IconSize.XxSmall)
                  .color(Colors.Accent)
                  .selectAction(createToggleAction());
              });
          });
      })
      .addContainer((cont: Container) => {
        cont
          .style(ContainerStyle.Accent)
          .bleed(true)
          .spacing(Spacing.Small)
          .isVisible(false)
          .id('vNarrowBalance')
          .targetWidth(TargetWidth.VeryNarrow)
          .addColumnSet((cs: ColumnSet) => {
            cs.horizontalAlignment(HorizontalAlignment.Left)
              .column('40px', (c: Column) => {
                c.verticalContentAlignment(VerticalAlignment.Center).addTextBlock(
                  '24h',
                  (t: TextBlock) => {
                    t.wrap(true)
                      .size(TextSize.Large)
                      .weight(TextWeight.Bolder)
                      .color(Colors.Accent);
                  },
                );
              })
              .column(Width.Auto, (c: Column) => {
                c.verticalContentAlignment(VerticalAlignment.Center)
                  .spacing(Spacing.Small)
                  .addIcon('HeartPulse', (i: Icon) => {
                    i.color(Colors.Accent).size(IconSize.XSmall);
                  });
              })
              .column(Width.Stretch, (c: Column) => {
                c.verticalContentAlignment(VerticalAlignment.Center)
                  .spacing(Spacing.ExtraSmall)
                  .addTextBlock('Sick days', (t: TextBlock) => {
                    t.wrap(true)
                      .weight(TextWeight.Bolder)
                      .size(TextSize.Small)
                      .color(Colors.Default);
                  });
              });
          })
          .addColumnSet((cs: ColumnSet) => {
            cs.spacing(Spacing.ExtraSmall)
              .column('40px', (c: Column) => {
                c.verticalContentAlignment(VerticalAlignment.Center).addTextBlock(
                  '12h',
                  (t: TextBlock) => {
                    t.wrap(true)
                      .weight(TextWeight.Bolder)
                      .color(Colors.Accent)
                      .size(TextSize.Large);
                  },
                );
              })
              .column(Width.Auto, (c: Column) => {
                c.verticalContentAlignment(VerticalAlignment.Center)
                  .spacing(Spacing.Small)
                  .addIcon('LeafOne', (i: Icon) => {
                    i.color(Colors.Accent).size(IconSize.XSmall);
                  });
              })
              .column(Width.Stretch, (c: Column) => {
                c.verticalContentAlignment(VerticalAlignment.Center)
                  .spacing(Spacing.ExtraSmall)
                  .addTextBlock('Wellness', (t: TextBlock) => {
                    t.wrap(true)
                      .size(TextSize.Small)
                      .weight(TextWeight.Bolder)
                      .color(Colors.Default);
                  });
              });
          })
          .addColumnSet((cs: ColumnSet) => {
            cs.spacing(Spacing.ExtraSmall)
              .column('40px', (c: Column) => {
                c.verticalContentAlignment(VerticalAlignment.Center).addTextBlock(
                  '32h',
                  (t: TextBlock) => {
                    t.wrap(true)
                      .weight(TextWeight.Bolder)
                      .color(Colors.Accent)
                      .size(TextSize.Large);
                  },
                );
              })
              .column(Width.Auto, (c: Column) => {
                c.verticalContentAlignment(VerticalAlignment.Center)
                  .spacing(Spacing.Small)
                  .addIcon('Beach', (i: Icon) => {
                    i.color(Colors.Accent).size(IconSize.XSmall);
                  });
              })
              .column(Width.Stretch, (c: Column) => {
                c.verticalContentAlignment(VerticalAlignment.Center)
                  .spacing(Spacing.ExtraSmall)
                  .addTextBlock('Paid time off', (t: TextBlock) => {
                    t.wrap(true)
                      .size(TextSize.Small)
                      .weight(TextWeight.Bolder)
                      .color(Colors.Default);
                  });
              });
          });
      })
      .addChoiceSetInput('leave_reason', (input: ChoiceSetInput) => {
        input
          .label('Reason for leave')
          .choice('Vacation', 'Vacation')
          .choice('Sick Day', 'Sick Day')
          .choice('Sick Leave', 'Sick Leave')
          .choice('Other', 'Other')
          .value('Vacation')
          .spacing(Spacing.Medium);
      })
      .addToggleInput('all_day', 'All day (8hrs)', (input: ToggleInput) => {
        input.spacing(Spacing.Small);
      })
      .addContainer((cont: Container) => {
        cont
          .addFlowLayout((layout: FlowLayout) => {
            layout
              .verticalItemsAlignment(VerticalAlignment.Bottom)
              .minItemWidth('0px')
              .itemFit(ItemFit.Fill);
          })
          .addDateInput('date', 'Date', (input: DateInput) => {
            input.isRequired(true).errorMessage('Date is required');
          });
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.column(Width.Stretch).column(Width.Stretch, (c: Column) => {
          c.spacing(Spacing.Small).verticalContentAlignment(
            VerticalAlignment.Bottom,
          );
        });
      })
      .addNumberInput(
        'days_off',
        'Estimated days off',
        'Select how many days',
        (input: NumberInput) => {
          input.spacing(Spacing.Medium);
        },
      )
      .addColumnSet((cs: ColumnSet) => {
        cs.spacing(Spacing.Medium)
          .column(Width.Auto, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Center).addRichTextBlock(
              (rtb: RichTextBlock) => {
                rtb
                  .targetWidth(TargetWidth.AtLeastNarrow)
                  .addInlines(
                    TextRun.make('Add comments').selectAction(
                      createCommentToggleAction(),
                    ),
                  );
              },
            );
          })
          .column(Width.Auto, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Center)
              .spacing(Spacing.Small)
              .selectAction(createCommentToggleAction())
              .addIcon('ChevronDown', (i: Icon) => {
                i.color(Colors.Accent)
                  .id('chevronDown')
                  .size(IconSize.XxSmall);
              })
              .addIcon('ChevronUp', (i: Icon) => {
                i.color(Colors.Accent)
                  .id('chevronUp')
                  .isVisible(false)
                  .size(IconSize.XxSmall)
                  .spacing(Spacing.None);
              });
          });
      })
      .addTextInput(
        'comments',
        null,
        'Enter any comments',
        (input: TextInput) => {
          input.isVisible(false).isMultiline(true);
        },
      )
      .addActionSet((as: ActionSet) => {
        as.separator(true)
          .spacing(Spacing.ExtraLarge)
          .addActions(SubmitAction.make('Submit').style(ActionStyle.Positive));
      });

    assertMatchesFixture(card, '10-time-off-request-form');
  });

  test('build Expense Report Card (11-expense-report-travel-to-seattle-approved)', () => {
    const toggleTargets = [
      TargetElement.make('reimbursement'),
      TargetElement.make('chevronUp'),
      TargetElement.make('chevronDown'),
    ];

    const createToggleAction = (): ToggleVisibilityAction =>
      ToggleVisibilityAction.make().targetElements(toggleTargets);

    const card = AdaptiveCard.make('1.6')
      .schema('https://adaptivecards.io/schemas/adaptive-card.json')
      .addTextBlock(
        "Your 'Travel to Seattle' expenses have been approved!",
        (t: TextBlock) => {
          t.wrap(true).size(TextSize.Large).weight(TextWeight.Bolder);
        },
      )
      .addContainer((cont: Container) => {
        cont
          .targetWidth(TargetWidth.VeryNarrow)
          .separator(true)
          .spacing(Spacing.Medium)
          .addColumnSet((cs: ColumnSet) => {
            cs.column(Width.Auto, (c: Column) => {
              c.addImage(
                'https://github.com/OfficeDev/Microsoft-Teams-Card-Samples/blob/pabloas/set-2/samples/expense-report/assets/seattle.png?raw=true',
                (img: Image) => {
                  img
                    .width('44px')
                    .height('44px')
                    .style(ImageStyle.RoundedCorners)
                    .altText('');
                },
              );
            }).column(Width.Stretch, (c: Column) => {
              c.addTextBlock('Travel to Seattle', (t: TextBlock) => {
                t.wrap(true).weight(TextWeight.Bolder);
              }).addColumnSet((innerCs: ColumnSet) => {
                innerCs
                  .spacing(Spacing.ExtraSmall)
                  .column(Width.Auto, (col: Column) => {
                    col
                      .verticalContentAlignment(VerticalAlignment.Center)
                      .addIcon('CheckmarkCircle', (i: Icon) => {
                        i.size(IconSize.XxSmall).color(Colors.Good);
                      });
                  })
                  .column(Width.Auto, (col: Column) => {
                    col
                      .spacing(Spacing.None)
                      .verticalContentAlignment(VerticalAlignment.Center)
                      .addTextBlock('Approved', (t: TextBlock) => {
                        t.wrap(true)
                          .size(TextSize.Small)
                          .weight(TextWeight.Bolder)
                          .color(Colors.Good);
                      });
                  });
              });
            });
          })
          .addTextBlock('Fri, 7 Aug 2024 - Tue, 21 Aug 2024', (t: TextBlock) => {
            t.wrap(true)
              .size(TextSize.Small)
              .isSubtle(false)
              .color(Colors.Default)
              .weight(TextWeight.Bolder)
              .spacing(Spacing.ExtraSmall);
          })
          .addTextBlock(
            'Business trip to meet client to sign final contracts.',
            (t: TextBlock) => {
              t.wrap(true)
                .spacing(Spacing.ExtraSmall)
                .size(TextSize.Small)
                .isSubtle(true);
            },
          );
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.targetWidth(TargetWidth.AtLeastNarrow)
          .spacing(Spacing.Medium)
          .column(Width.Auto, (c: Column) => {
            c.addImage(
              'https://github.com/OfficeDev/Microsoft-Teams-Card-Samples/blob/pabloas/set-2/samples/expense-report/assets/seattle.png?raw=true',
              (img: Image) => {
                img
                  .width('44px')
                  .height('44px')
                  .style(ImageStyle.RoundedCorners)
                  .altText('');
              },
            );
          })
          .column(Width.Stretch, (c: Column) => {
            c.addColumnSet((innerCs: ColumnSet) => {
              innerCs
                .column(Width.Stretch, (col: Column) => {
                  col
                    .verticalContentAlignment(VerticalAlignment.Bottom)
                    .addTextBlock('Travel to Seattle', (t: TextBlock) => {
                      t.wrap(true).weight(TextWeight.Bolder);
                    });
                })
                .column(Width.Auto, (col: Column) => {
                  col
                    .verticalContentAlignment(VerticalAlignment.Center)
                    .addIcon('CheckmarkCircle', (i: Icon) => {
                      i.size(IconSize.XxSmall).color(Colors.Good);
                    });
                })
                .column(Width.Auto, (col: Column) => {
                  col
                    .spacing(Spacing.None)
                    .verticalContentAlignment(VerticalAlignment.Center)
                    .addTextBlock('Approved', (t: TextBlock) => {
                      t.wrap(true)
                        .size(TextSize.Small)
                        .weight(TextWeight.Bolder)
                        .color(Colors.Good);
                    });
                });
            })
              .addTextBlock(
                'Fri, 7 Aug 2024 - Tue, 21 Aug 2024',
                (t: TextBlock) => {
                  t.wrap(true)
                    .size(TextSize.Small)
                    .isSubtle(false)
                    .weight(TextWeight.Bolder)
                    .color(Colors.Default)
                    .spacing(Spacing.ExtraSmall);
                },
              )
              .addTextBlock(
                'Business trip to meet client to sign final contracts.',
                (t: TextBlock) => {
                  t.wrap(true)
                    .spacing(Spacing.ExtraSmall)
                    .isSubtle(true)
                    .size(TextSize.Small);
                },
              );
          });
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.horizontalAlignment(HorizontalAlignment.Right)
          .spacing(Spacing.ExtraLarge)
          .separator(true)
          .column(Width.Auto, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Center).addIcon(
              'Receipt',
              (i: Icon) => {
                i.size(IconSize.XxSmall);
              },
            );
          })
          .column(Width.Auto, (c: Column) => {
            c.spacing(Spacing.ExtraSmall)
              .verticalContentAlignment(VerticalAlignment.Center)
              .addTextBlock('2', (t: TextBlock) => {
                t.wrap(true)
                  .size(TextSize.Small)
                  .weight(TextWeight.Bolder)
                  .color(Colors.Default);
              });
          })
          .column(Width.Auto, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Center).addIcon(
              'Comment',
              (i: Icon) => {
                i.size(IconSize.XxSmall);
              },
            );
          })
          .column(Width.Auto, (c: Column) => {
            c.spacing(Spacing.ExtraSmall)
              .verticalContentAlignment(VerticalAlignment.Center)
              .addTextBlock('4', (t: TextBlock) => {
                t.wrap(true)
                  .size(TextSize.Small)
                  .weight(TextWeight.Bolder)
                  .color(Colors.Default);
              });
          })
          .column(Width.Auto, (c: Column) => {
            c.spacing(Spacing.Medium)
              .verticalContentAlignment(VerticalAlignment.Center)
              .addTextBlock('$790.00', (t: TextBlock) => {
                t.wrap(true).weight(TextWeight.Bolder).size(TextSize.Small);
              });
          })
          .column(Width.Auto, (c: Column) => {
            c.spacing(Spacing.ExtraSmall)
              .addIcon('ChevronDown', (i: Icon) => {
                i.id('chevronDown')
                  .size(IconSize.XSmall)
                  .selectAction(createToggleAction());
              })
              .addIcon('ChevronUp', (i: Icon) => {
                i.id('chevronUp')
                  .size(IconSize.XSmall)
                  .isVisible(false)
                  .selectAction(createToggleAction());
              });
          });
      })
      .addContainer((cont: Container) => {
        cont
          .id('reimbursement')
          .spacing(Spacing.Small)
          .isVisible(false)
          .style(ContainerStyle.Emphasis)
          .roundedCorners(true)
          .showBorder(true)
          .addTextBlock('Reimbursement #238-29', (t: TextBlock) => {
            t.wrap(true).size(TextSize.Small);
          })
          .addContainer((innerCont: Container) => {
            innerCont
              .style(ContainerStyle.Default)
              .roundedCorners(true)
              .addColumnSet((cs: ColumnSet) => {
                cs.column(Width.Auto)
                  .column(Width.Stretch, (c: Column) => {
                    c.spacing(Spacing.Small)
                      .addTextBlock(
                        'Receipts and itineraries',
                        (t: TextBlock) => {
                          t.wrap(true).size(TextSize.Small);
                        },
                      )
                      .addTextBlock('$890.00', (t: TextBlock) => {
                        t.wrap(true)
                          .targetWidth(TargetWidth.VeryNarrow)
                          .weight(TextWeight.Bolder)
                          .spacing(Spacing.ExtraSmall)
                          .size(TextSize.Small);
                      });
                  })
                  .column(Width.Auto, (c: Column) => {
                    c.horizontalAlignment(HorizontalAlignment.Right)
                      .targetWidth(TargetWidth.AtLeastNarrow)
                      .addTextBlock('$890.00', (t: TextBlock) => {
                        t.wrap(true)
                          .weight(TextWeight.Bolder)
                          .size(TextSize.Small);
                      });
                  })
                  .column(Width.Auto, (c: Column) => {
                    c.spacing(Spacing.Small);
                  });
              })
              .addColumnSet((cs: ColumnSet) => {
                cs.separator(true)
                  .column(Width.Auto)
                  .column(Width.Stretch, (c: Column) => {
                    c.spacing(Spacing.Small)
                      .addTextBlock(
                        'Non-reimbursable amount',
                        (t: TextBlock) => {
                          t.wrap(true).size(TextSize.Small);
                        },
                      )
                      .addTextBlock('$100.00', (t: TextBlock) => {
                        t.wrap(true)
                          .weight(TextWeight.Bolder)
                          .spacing(Spacing.ExtraSmall)
                          .targetWidth(TargetWidth.VeryNarrow)
                          .size(TextSize.Small);
                      });
                  })
                  .column(Width.Auto, (c: Column) => {
                    c.horizontalAlignment(HorizontalAlignment.Right)
                      .targetWidth(TargetWidth.AtLeastNarrow)
                      .addTextBlock('$100.00', (t: TextBlock) => {
                        t.wrap(true)
                          .weight(TextWeight.Bolder)
                          .size(TextSize.Small);
                      });
                  })
                  .column(Width.Auto, (c: Column) => {
                    c.spacing(Spacing.Small);
                  });
              })
              .addColumnSet((cs: ColumnSet) => {
                cs.separator(true)
                  .column(Width.Auto)
                  .column(Width.Stretch, (c: Column) => {
                    c.spacing(Spacing.Small)
                      .addTextBlock('Cash advance', (t: TextBlock) => {
                        t.wrap(true).size(TextSize.Small);
                      })
                      .addTextBlock('$50.00', (t: TextBlock) => {
                        t.wrap(true)
                          .spacing(Spacing.ExtraSmall)
                          .weight(TextWeight.Bolder)
                          .targetWidth(TargetWidth.VeryNarrow)
                          .size(TextSize.Small);
                      });
                  })
                  .column(Width.Auto, (c: Column) => {
                    c.horizontalAlignment(HorizontalAlignment.Right)
                      .targetWidth(TargetWidth.AtLeastNarrow)
                      .addTextBlock('$50.00', (t: TextBlock) => {
                        t.wrap(true)
                          .weight(TextWeight.Bolder)
                          .size(TextSize.Small);
                      });
                  })
                  .column(Width.Auto, (c: Column) => {
                    c.spacing(Spacing.Small);
                  });
              })
              .addColumnSet((cs: ColumnSet) => {
                cs.separator(true)
                  .column(Width.Auto)
                  .column(Width.Stretch, (c: Column) => {
                    c.spacing(Spacing.Small)
                      .addColumnSet((totalCs: ColumnSet) => {
                        totalCs
                          .spacing(Spacing.None)
                          .column(Width.Auto, (col: Column) => {
                            col
                              .targetWidth(TargetWidth.AtLeastNarrow)
                              .spacing(Spacing.None)
                              .addIcon('CheckmarkCircle', (i: Icon) => {
                                i.size(IconSize.XxSmall)
                                  .color(Colors.Good)
                                  .spacing(Spacing.None);
                              });
                          })
                          .column(Width.Stretch, (col: Column) => {
                            col
                              .spacing(Spacing.ExtraSmall)
                              .addTextBlock(
                                'Total reimbursement',
                                (t: TextBlock) => {
                                  t.wrap(true)
                                    .weight(TextWeight.Bolder)
                                    .size(TextSize.Small)
                                    .spacing(Spacing.None);
                                },
                              );
                          });
                      })
                      .addColumnSet((totalCs: ColumnSet) => {
                        totalCs
                          .spacing(Spacing.ExtraSmall)
                          .targetWidth(TargetWidth.VeryNarrow)
                          .column(Width.Auto, (col: Column) => {
                            col.addIcon('CheckmarkCircle', (i: Icon) => {
                              i.size(IconSize.XxSmall).color(Colors.Good);
                            });
                          })
                          .column(Width.Stretch, (col: Column) => {
                            col
                              .spacing(Spacing.ExtraSmall)
                              .addTextBlock('$790.00', (t: TextBlock) => {
                                t.wrap(true)
                                  .weight(TextWeight.Bolder)
                                  .size(TextSize.Small);
                              });
                          });
                      });
                  })
                  .column(Width.Auto, (c: Column) => {
                    c.horizontalAlignment(HorizontalAlignment.Right)
                      .targetWidth(TargetWidth.AtLeastNarrow)
                      .addTextBlock('$790.00', (t: TextBlock) => {
                        t.wrap(true)
                          .weight(TextWeight.Bolder)
                          .size(TextSize.Small);
                      });
                  })
                  .column(Width.Auto, (c: Column) => {
                    c.spacing(Spacing.Small);
                  });
              });
          });
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.spacing(Spacing.ExtraLarge)
          .separator(true)
          .column(Width.Auto, (c: Column) => {
            c.addImage(
              'https://github.com/OfficeDev/Microsoft-Teams-Card-Samples/blob/pabloas/set-2/samples/expense-report/assets/Avatar.png?raw=true',
              (img: Image) => {
                img
                  .style(ImageStyle.Person)
                  .width('24px')
                  .height('24px')
                  .altText('');
              },
            );
          })
          .column(Width.Stretch, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Center).addRichTextBlock(
              (rtb: RichTextBlock) => {
                rtb
                  .addInlines(
                    TextRun.make('Approved by ').size(TextSize.Small),
                  )
                  .addInlines(
                    TextRun.make('Mona Kane')
                      .size(TextSize.Small)
                      .weight(TextWeight.Bolder),
                  );
              },
            );
          });
      })
      .addActionSet((as: ActionSet) => {
        as.spacing(Spacing.Large).addActions(
          OpenUrlAction.make(
            'https://github.com/OfficeDev/Microsoft-Teams-Adaptive-Card-Samples',
            'View statement',
          ),
        );
      });

    assertMatchesFixture(card, '11-expense-report-travel-to-seattle-approved');
  });

  test('build Book A Room Card (12-meeting-room-booking-form)', () => {
    const toggleTargets = [
      TargetElement.make('notes'),
      TargetElement.make('chevronUp'),
      TargetElement.make('chevronDown'),
    ];

    const createToggleAction = (): ToggleVisibilityAction =>
      ToggleVisibilityAction.make().targetElements(toggleTargets);

    const heroUrl =
      'https://raw.githubusercontent.com/suzto/StarterCards/refs/heads/main/samples/book-a-room/assets/room_hero.png';

    const card = AdaptiveCard.make('1.6')
      .schema('https://adaptivecards.io/schemas/adaptive-card.json')
      .addContainer((cont: Container) => {
        cont
          .style(ContainerStyle.Emphasis)
          .targetWidth(TargetWidth.AtLeastStandard)
          .minHeight('200px')
          .roundedCorners(true)
          .verticalContentAlignment(VerticalAlignment.Bottom)
          .backgroundImage(
            BackgroundImage.make(heroUrl).verticalAlignment(
              VerticalAlignment.Bottom,
            ),
          )
          .addColumnSet((cs: ColumnSet) => {
            cs.targetWidth(TargetWidth.AtLeastStandard)
              .column(Width.Stretch)
              .column('190px', (c: Column) => {
                c.addContainer((innerCont: Container) => {
                  innerCont
                    .roundedCorners(true)
                    .style(ContainerStyle.Default)
                    .addTextBlock(
                      'Book a private meeting room',
                      (t: TextBlock) => {
                        t.maxLines(0)
                          .size(TextSize.ExtraLarge)
                          .weight(TextWeight.Bolder)
                          .wrap(true);
                      },
                    );
                });
              });
          });
      })
      .addContainer((cont: Container) => {
        cont
          .style(ContainerStyle.Emphasis)
          .targetWidth(TargetWidth.Narrow)
          .minHeight('140px')
          .roundedCorners(true)
          .verticalContentAlignment(VerticalAlignment.Bottom)
          .backgroundImage(
            BackgroundImage.make(heroUrl).verticalAlignment(
              VerticalAlignment.Bottom,
            ),
          )
          .addColumnSet((cs: ColumnSet) => {
            cs.column(Width.Stretch).column('150px');
          });
      })
      .addImage(heroUrl, (img: Image) => {
        img
          .style(ImageStyle.RoundedCorners)
          .targetWidth(TargetWidth.VeryNarrow);
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.spacing(Spacing.Medium)
          .targetWidth(TargetWidth.AtMostNarrow)
          .column(Width.Stretch, (c: Column) => {
            c.addTextBlock('The Rooftop Terrace', (t: TextBlock) => {
              t.wrap(true).weight(TextWeight.Bolder).color(Colors.Accent);
            }).addColumnSet((innerCs: ColumnSet) => {
              innerCs
                .spacing(Spacing.ExtraSmall)
                .column(Width.Auto, (col: Column) => {
                  col.addIcon('Crown', (i: Icon) => {
                    i.size(IconSize.XxSmall).color(Colors.Accent);
                  });
                })
                .column(Width.Stretch, (col: Column) => {
                  col
                    .spacing(Spacing.ExtraSmall)
                    .addTextBlock('Executive suite', (t: TextBlock) => {
                      t.wrap(true)
                        .size(TextSize.Small)
                        .color(Colors.Default)
                        .isSubtle(true);
                    });
                });
            });
          });
      })
      .addColumnSet((cs: ColumnSet) => {
        cs.spacing(Spacing.Medium)
          .targetWidth(TargetWidth.AtLeastStandard)
          .column(Width.Auto, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Center).addTextBlock(
              'The Rooftop Terrace ',
              (t: TextBlock) => {
                t.color(Colors.Accent).weight(TextWeight.Bolder).wrap(true);
              },
            );
          })
          .column(Width.Auto, (c: Column) => {
            c.spacing(Spacing.Small)
              .targetWidth(TargetWidth.AtLeastNarrow)
              .verticalContentAlignment(VerticalAlignment.Center)
              .addTextBlock('·');
          })
          .column(Width.Auto, (c: Column) => {
            c.spacing(Spacing.Small)
              .targetWidth(TargetWidth.AtLeastNarrow)
              .verticalContentAlignment(VerticalAlignment.Center)
              .addIcon('Crown', (i: Icon) => {
                i.color(Colors.Accent).size(IconSize.XxSmall);
              });
          })
          .column(Width.Stretch, (c: Column) => {
            c.spacing(Spacing.Small)
              .targetWidth(TargetWidth.AtLeastNarrow)
              .verticalContentAlignment(VerticalAlignment.Center)
              .addTextBlock('Executive suite', (t: TextBlock) => {
                t.isSubtle(true).size(TextSize.Small).wrap(true);
              });
          });
      })
      .addContainer((cont: Container) => {
        cont
          .spacing(Spacing.Medium)
          .addDateInput('date', 'Start Date', (input: DateInput) => {
            input.errorMessage('Start date is required').isRequired(true);
          })
          .addTimeInput('time', 'Start Time', (input: TimeInput) => {
            input.errorMessage('Start time is required').isRequired(true);
          })
          .addFlowLayout((layout: FlowLayout) => {
            layout
              .columnSpacing(Spacing.Small)
              .itemFit(ItemFit.Fill)
              .minItemWidth('0px')
              .rowSpacing(Spacing.Small);
          });
      })
      .addChoiceSetInput('duration', (input: ChoiceSetInput) => {
        input
          .label('Duration')
          .spacing(Spacing.Medium)
          .isRequired(true)
          .errorMessage('Duration is required')
          .value('1')
          .choice('1 Hour', '1')
          .choice('2 Hours', '2')
          .choice('3 Hours', '3');
      })
      .addTextInput(
        'title',
        'Meeting or event title',
        'Enter optional title',
        (input: TextInput) => {
          input.spacing(Spacing.Medium);
        },
      )
      .addChoiceSetInput('catering', (input: ChoiceSetInput) => {
        input
          .label('Select a catering option')
          .spacing(Spacing.Medium)
          .style(ChoiceInputStyle.Expanded)
          .choice('Lunch buffet', 'value1')
          .choice('Dinner with appetizers', 'value2');
      })
      .addRatingInput(
        'rating',
        'Rate importance of having catering services',
        (input: RatingInput) => {
          input.color(RatingColor.Marigold).spacing(Spacing.Small);
        },
      )
      .addColumnSet((cs: ColumnSet) => {
        cs.spacing(Spacing.Medium)
          .column(Width.Auto, (c: Column) => {
            c.verticalContentAlignment(VerticalAlignment.Center)
              .addRichTextBlock((rtb: RichTextBlock) => {
                rtb
                  .targetWidth(TargetWidth.AtLeastNarrow)
                  .addInlines(
                    TextRun.make('Add notes or requests').selectAction(
                      createToggleAction(),
                    ),
                  );
              })
              .addRichTextBlock((rtb: RichTextBlock) => {
                rtb
                  .spacing(Spacing.None)
                  .targetWidth(TargetWidth.VeryNarrow)
                  .addInlines(
                    TextRun.make('Additional options').selectAction(
                      createToggleAction(),
                    ),
                  );
              });
          })
          .column(Width.Auto, (c: Column) => {
            c.spacing(Spacing.Small)
              .verticalContentAlignment(VerticalAlignment.Center)
              .selectAction(createToggleAction())
              .addIcon('ChevronDown', (i: Icon) => {
                i.color(Colors.Accent)
                  .id('chevronDown')
                  .size(IconSize.XxSmall);
              })
              .addIcon('ChevronUp', (i: Icon) => {
                i.color(Colors.Accent)
                  .id('chevronUp')
                  .isVisible(false)
                  .size(IconSize.XxSmall)
                  .spacing(Spacing.None);
              });
          });
      })
      .addTextInput(
        'notes',
        null,
        'Enter any additional notes or requests',
        (input: TextInput) => {
          input.isMultiline(true).isVisible(false).spacing(Spacing.Small);
        },
      )
      .addActionSet((as: ActionSet) => {
        as.separator(true)
          .spacing(Spacing.Medium)
          .addActions(SubmitAction.make('Submit').style(ActionStyle.Positive));
      });

    assertMatchesFixture(card, '12-meeting-room-booking-form');
  });

  test('build Cafe Menu Card (13-cafeteria-24-menu)', () => {
    const toggleTargets = [
      TargetElement.make('menu'),
      TargetElement.make('info'),
    ];

    const createToggleAction = (): ToggleVisibilityAction =>
      ToggleVisibilityAction.make().targetElements(toggleTargets);

    const assets =
      'https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Adaptive-Card-Samples/main/samples/cafe-menu/assets/';

    const card = AdaptiveCard.make('1.6')
      .schema('https://adaptivecards.io/schemas/adaptive-card.json')
      .addContainer((cont: Container) => {
        cont
          .roundedCorners(true)
          .backgroundImage(BackgroundImage.make(`${assets}hero.png`))
          .minHeight('160px')
          .verticalContentAlignment(VerticalAlignment.Bottom)
          .targetWidth(TargetWidth.AtLeastNarrow)
          .addTextBlock('Cafeteria 24', (t: TextBlock) => {
            t.wrap(true)
              .size(TextSize.ExtraLarge)
              .weight(TextWeight.Bolder)
              .color(Colors.Light);
          });
      })
      .addContainer((cont: Container) => {
        cont
          .backgroundImage(
            BackgroundImage.make(`${assets}hero.png`).verticalAlignment(
              VerticalAlignment.Center,
            ),
          )
          .verticalContentAlignment(VerticalAlignment.Bottom)
          .minHeight('120px')
          .roundedCorners(true)
          .targetWidth(TargetWidth.VeryNarrow)
          .addTextBlock('Cafeteria 24', (t: TextBlock) => {
            t.wrap(true)
              .size(TextSize.ExtraLarge)
              .weight(TextWeight.Bolder)
              .color(Colors.Light);
          });
      })
      .addContainer((cont: Container) => {
        cont
          .id('menu')
          .spacing(Spacing.Large)
          .addContainer((tabs: Container) => {
            tabs.addColumnSet((cs: ColumnSet) => {
              cs.spacing(Spacing.Large)
                .column(Width.Stretch, (c: Column) => {
                  c.addTextBlock('Menu', (t: TextBlock) => {
                    t.wrap(true)
                      .weight(TextWeight.Bolder)
                      .horizontalAlignment(HorizontalAlignment.Center);
                  }).addContainer((line: Container) => {
                    line
                      .backgroundImage(
                        BackgroundImage.make(`${assets}tabline.png`)
                          .fillMode(ImageFillMode.RepeatHorizontally)
                          .verticalAlignment(VerticalAlignment.Center),
                      )
                      .minHeight('3px')
                      .style(ContainerStyle.Default)
                      .spacing(Spacing.None);
                  });
                })
                .column(Width.Stretch, (c: Column) => {
                  c.selectAction(createToggleAction()).addTextBlock(
                    'Info',
                    (t: TextBlock) => {
                      t.wrap(true).horizontalAlignment(
                        HorizontalAlignment.Center,
                      );
                    },
                  );
                });
            });
          })
          .addTextBlock("Today's Specials", (t: TextBlock) => {
            t.wrap(true)
              .size(TextSize.Small)
              .weight(TextWeight.Bolder)
              .isSubtle(true)
              .spacing(Spacing.Medium);
          })
          .addContainer((item: Container) => {
            item
              .style(ContainerStyle.Emphasis)
              .showBorder(true)
              .roundedCorners(true)
              .spacing(Spacing.Small)
              .addColumnSet((cs: ColumnSet) => {
                cs.targetWidth(TargetWidth.AtLeastNarrow)
                  .column('80px', (c: Column) => {
                    c.minHeight('80px').addImage(
                      `${assets}menuItem_1.png`,
                      (img: Image) => {
                        img
                          .style(ImageStyle.RoundedCorners)
                          .width('80px')
                          .height('80px');
                      },
                    );
                  })
                  .column(Width.Stretch, (c: Column) => {
                    c.addTextBlock('Korean Fried Chicken', (t: TextBlock) => {
                      t.wrap(true).weight(TextWeight.Bolder);
                    })
                      .addTextBlock(
                        'Boneless Korean gochujhang or sweet garlic fried chicken over your choice of rice.',
                        (t: TextBlock) => {
                          t.wrap(true).spacing(Spacing.None);
                        },
                      )
                      .addTextBlock('• Organic', (t: TextBlock) => {
                        t.wrap(true).spacing(Spacing.None);
                      })
                      .addRichTextBlock((rtb: RichTextBlock) => {
                        rtb
                          .spacing(Spacing.None)
                          .inlines(
                            TextRun.make('• Farm to table - '),
                            TextRun.make('Harvest Moon Farm')
                              .italic(true)
                              .color(Colors.Accent),
                          );
                      })
                      .addRichTextBlock((rtb: RichTextBlock) => {
                        rtb
                          .spacing(Spacing.None)
                          .inlines(
                            TextRun.make('$12.00')
                              .color(Colors.Attention)
                              .strikethrough(true),
                            TextRun.make('  $10.99').isSubtle(true),
                          );
                      });
                  })
                  .column(Width.Auto, (c: Column) => {
                    c.verticalContentAlignment(VerticalAlignment.Center)
                      .spacing(Spacing.ExtraSmall)
                      .addIcon('ChevronRight', (i: Icon) => {
                        i.size(IconSize.Small);
                      });
                  });
              })
              .addContainer((narrow: Container) => {
                narrow
                  .spacing(Spacing.None)
                  .targetWidth(TargetWidth.VeryNarrow)
                  .horizontalAlignment(HorizontalAlignment.Center)
                  .addImage(`${assets}menuItem_1.png`, (img: Image) => {
                    img
                      .width('64px')
                      .height('64px')
                      .style(ImageStyle.RoundedCorners);
                  })
                  .addTextBlock('Korean Fried Chicken', (t: TextBlock) => {
                    t.wrap(true)
                      .weight(TextWeight.Bolder)
                      .spacing(Spacing.Small);
                  })
                  .addRichTextBlock((rtb: RichTextBlock) => {
                    rtb
                      .spacing(Spacing.None)
                      .inlines(
                        TextRun.make('$12.00')
                          .color(Colors.Attention)
                          .strikethrough(true),
                        TextRun.make('  $10.99').isSubtle(true),
                      );
                  });
              });
          })
          .addContainer((item: Container) => {
            item
              .style(ContainerStyle.Emphasis)
              .showBorder(true)
              .roundedCorners(true)
              .spacing(Spacing.Small)
              .addColumnSet((cs: ColumnSet) => {
                cs.targetWidth(TargetWidth.AtLeastNarrow)
                  .column('80px', (c: Column) => {
                    c.minHeight('80px').addImage(
                      `${assets}menuItem_2.png`,
                      (img: Image) => {
                        img
                          .style(ImageStyle.RoundedCorners)
                          .width('80px')
                          .height('80px');
                      },
                    );
                  })
                  .column(Width.Stretch, (c: Column) => {
                    c.addTextBlock('Bibimbap', (t: TextBlock) => {
                      t.wrap(true).weight(TextWeight.Bolder);
                    })
                      .addTextBlock(
                        'Korean rice bowl with your choice of protein, vegetable toppings, egg and your choice of sauce.',
                        (t: TextBlock) => {
                          t.wrap(true).spacing(Spacing.None);
                        },
                      )
                      .addRichTextBlock((rtb: RichTextBlock) => {
                        rtb
                          .spacing(Spacing.None)
                          .inlines(
                            TextRun.make('$13.00')
                              .color(Colors.Attention)
                              .strikethrough(true),
                            TextRun.make('  $12.00').isSubtle(true),
                          );
                      });
                  })
                  .column(Width.Auto, (c: Column) => {
                    c.verticalContentAlignment(VerticalAlignment.Center)
                      .spacing(Spacing.ExtraSmall)
                      .addIcon('ChevronRight', (i: Icon) => {
                        i.size(IconSize.Small);
                      });
                  });
              })
              .addContainer((narrow: Container) => {
                narrow
                  .spacing(Spacing.None)
                  .targetWidth(TargetWidth.VeryNarrow)
                  .horizontalAlignment(HorizontalAlignment.Center)
                  .addImage(`${assets}menuItem_2.png`, (img: Image) => {
                    img
                      .width('64px')
                      .height('64px')
                      .style(ImageStyle.RoundedCorners);
                  })
                  .addTextBlock('Bibimbap', (t: TextBlock) => {
                    t.wrap(true)
                      .weight(TextWeight.Bolder)
                      .spacing(Spacing.Small);
                  })
                  .addRichTextBlock((rtb: RichTextBlock) => {
                    rtb
                      .spacing(Spacing.None)
                      .inlines(
                        TextRun.make('$13.00')
                          .color(Colors.Attention)
                          .strikethrough(true),
                        TextRun.make('  $12.00').isSubtle(true),
                      );
                  });
              });
          })
          .addContainer((item: Container) => {
            item
              .style(ContainerStyle.Emphasis)
              .showBorder(true)
              .roundedCorners(true)
              .spacing(Spacing.Small)
              .addColumnSet((cs: ColumnSet) => {
                cs.targetWidth(TargetWidth.AtLeastNarrow)
                  .column('80px', (c: Column) => {
                    c.minHeight('80px').addImage(
                      `${assets}menuItem_3.png`,
                      (img: Image) => {
                        img
                          .style(ImageStyle.RoundedCorners)
                          .width('80px')
                          .height('80px');
                      },
                    );
                  })
                  .column(Width.Stretch, (c: Column) => {
                    c.addTextBlock('Japchae Noodle Bowl', (t: TextBlock) => {
                      t.wrap(true).weight(TextWeight.Bolder);
                    })
                      .addTextBlock(
                        'Vermicelli noodles pan fried with a variety of vegetables with a sweet soy sauce.',
                        (t: TextBlock) => {
                          t.wrap(true).spacing(Spacing.None);
                        },
                      )
                      .addTextBlock('• Vegan', (t: TextBlock) => {
                        t.wrap(true).spacing(Spacing.None);
                      })
                      .addRichTextBlock((rtb: RichTextBlock) => {
                        rtb
                          .spacing(Spacing.None)
                          .inlines(
                            TextRun.make('• Local made - '),
                            TextRun.make('Hikari Ramen House')
                              .italic(true)
                              .color(Colors.Accent),
                          );
                      })
                      .addRichTextBlock((rtb: RichTextBlock) => {
                        rtb
                          .spacing(Spacing.None)
                          .inlines(
                            TextRun.make('$14.00')
                              .color(Colors.Attention)
                              .strikethrough(true),
                            TextRun.make('  $11.99').isSubtle(true),
                          );
                      });
                  })
                  .column(Width.Auto, (c: Column) => {
                    c.verticalContentAlignment(VerticalAlignment.Center)
                      .spacing(Spacing.ExtraSmall)
                      .addIcon('ChevronRight', (i: Icon) => {
                        i.size(IconSize.Small);
                      });
                  });
              })
              .addContainer((narrow: Container) => {
                narrow
                  .spacing(Spacing.None)
                  .targetWidth(TargetWidth.VeryNarrow)
                  .horizontalAlignment(HorizontalAlignment.Center)
                  .addImage(`${assets}menuItem_3.png`, (img: Image) => {
                    img
                      .width('64px')
                      .height('64px')
                      .style(ImageStyle.RoundedCorners);
                  })
                  .addTextBlock('Japchae Noodle Bowl', (t: TextBlock) => {
                    t.wrap(true)
                      .weight(TextWeight.Bolder)
                      .spacing(Spacing.Small);
                  })
                  .addRichTextBlock((rtb: RichTextBlock) => {
                    rtb
                      .spacing(Spacing.None)
                      .inlines(
                        TextRun.make('$14.00')
                          .color(Colors.Attention)
                          .strikethrough(true),
                        TextRun.make('  $11.99').isSubtle(true),
                      );
                  });
              });
          });
      })
      .addContainer((cont: Container) => {
        cont
          .id('info')
          .spacing(Spacing.Large)
          .isVisible(false)
          .addColumnSet((cs: ColumnSet) => {
            cs.spacing(Spacing.Large)
              .column(Width.Stretch, (c: Column) => {
                c.selectAction(createToggleAction()).addTextBlock(
                  'Menu',
                  (t: TextBlock) => {
                    t.wrap(true).horizontalAlignment(
                      HorizontalAlignment.Center,
                    );
                  },
                );
              })
              .column(Width.Stretch, (c: Column) => {
                c.addTextBlock('Info', (t: TextBlock) => {
                  t.wrap(true)
                    .weight(TextWeight.Bolder)
                    .horizontalAlignment(HorizontalAlignment.Center);
                }).addContainer((line: Container) => {
                  line
                    .backgroundImage(
                      BackgroundImage.make(`${assets}tabline.png`)
                        .fillMode(ImageFillMode.RepeatHorizontally)
                        .verticalAlignment(VerticalAlignment.Center),
                    )
                    .minHeight('3px')
                    .style(ContainerStyle.Default)
                    .spacing(Spacing.None);
                });
              });
          })
          .addTextBlock('Food Stations', (t: TextBlock) => {
            t.wrap(true).weight(TextWeight.Bolder).size(TextSize.Large);
          })
          .addColumnSet((cs: ColumnSet) => {
            cs.spacing(Spacing.ExtraSmall)
              .column(Width.Auto, (c: Column) => {
                c.spacing(Spacing.ExtraSmall).addIcon('Clock', (i: Icon) => {
                  i.size(IconSize.XxSmall).spacing(Spacing.ExtraSmall);
                });
              })
              .column(Width.Stretch, (c: Column) => {
                c.spacing(Spacing.ExtraSmall).addTextBlock(
                  'Open Mon-Fri 8:00AM to 5:00PM',
                  (t: TextBlock) => {
                    t.wrap(true)
                      .spacing(Spacing.ExtraSmall)
                      .size(TextSize.Small)
                      .color(Colors.Default)
                      .isSubtle(true)
                      .weight(TextWeight.Bolder);
                  },
                );
              });
          })
          .addRichTextBlock((rtb: RichTextBlock) => {
            rtb.inlines(
              TextRun.make('￭ Pranzetto').weight(TextWeight.Bolder),
              TextRun.make(
                ': Curated sandwiches on house-made focaccia, organic produce, and more',
              ),
            );
          })
          .addRichTextBlock((rtb: RichTextBlock) => {
            rtb.inlines(
              TextRun.make('￭ Eat Local').weight(TextWeight.Bolder),
              TextRun.make(
                ': Rotating local brands such as Kalia, Maya’s Mexican and Facing East',
              ),
            );
          })
          .addRichTextBlock((rtb: RichTextBlock) => {
            rtb.inlines(
              TextRun.make('￭ Diner').weight(TextWeight.Bolder),
              TextRun.make(': All-day breakfast and lunch'),
            );
          })
          .addRichTextBlock((rtb: RichTextBlock) => {
            rtb.inlines(
              TextRun.make('￭ Grilled').weight(TextWeight.Bolder),
              TextRun.make(': Made-to-order grilled proteins and sides'),
            );
          })
          .addRichTextBlock((rtb: RichTextBlock) => {
            rtb.inlines(
              TextRun.make('￭ Mediterranean').weight(TextWeight.Bolder),
              TextRun.make(
                ': An array of grilled meats, falafel wraps, mezze bowls, and fresh salads',
              ),
            );
          })
          .addRichTextBlock((rtb: RichTextBlock) => {
            rtb.inlines(
              TextRun.make('￭ Street Food').weight(TextWeight.Bolder),
              TextRun.make(
                ': Ready-to-eat bites including sandwiches, tacos, and more',
              ),
            );
          })
          .addRichTextBlock((rtb: RichTextBlock) => {
            rtb.inlines(
              TextRun.make('￭ World Flavors').weight(TextWeight.Bolder),
              TextRun.make(': Gourmet cuisines from around the globe'),
            );
          })
          .addRichTextBlock((rtb: RichTextBlock) => {
            rtb.inlines(
              TextRun.make('￭ Sprout').weight(TextWeight.Bolder),
              TextRun.make(
                ': Self-service salad bar featuring a variety of toppings and gourmet soups',
              ),
            );
          })
          .addRichTextBlock((rtb: RichTextBlock) => {
            rtb.inlines(
              TextRun.make('￭ Oma Bap').weight(TextWeight.Bolder),
              TextRun.make(': Homestyle Korean fried chicken and bibimbap'),
            );
          })
          .addRichTextBlock((rtb: RichTextBlock) => {
            rtb.inlines(
              TextRun.make('￭ Flora').weight(TextWeight.Bolder),
              TextRun.make(': Rotating vegan and vegetarian dishes'),
            );
          });
      });

    assertMatchesFixture(card, '13-cafeteria-24-menu');
  });
});
