// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as Enums from "./enums";
import {
    CardElement,
    Container,
    ContainerBase,
    StylableCardElementContainer
} from "./card-elements";
import {
    BoolProperty,
    EnumProperty,
    NumProperty,
    PixelSizeProperty,
    property,
    SerializableObjectSchema,
    Versions
} from "./serialization";

export class CarouselPage extends Container {
    protected populateSchema(schema: SerializableObjectSchema) {
        super.populateSchema(schema);

        // `style`, `bleed` and `isVisible` are not supported on a CarouselPage.
        schema.remove(
            StylableCardElementContainer.styleProperty,
            ContainerBase.bleedProperty,
            CardElement.isVisibleProperty
        );
    }

    getJsonTypeName(): string {
        return "CarouselPage";
    }

    get isStandalone(): boolean {
        return false;
    }
}

export class Carousel extends Container {
    //#region Schema

    static readonly timerProperty = new NumProperty(Versions.v1_6, "timer");
    static readonly initialPageProperty = new NumProperty(Versions.v1_6, "initialPage", 0);
    static readonly loopProperty = new BoolProperty(Versions.v1_6, "loop", true);
    static readonly orientationProperty = new EnumProperty(
        Versions.v1_6,
        "orientation",
        Enums.Orientation,
        Enums.Orientation.Horizontal
    );
    static readonly carouselHeightProperty = new PixelSizeProperty(Versions.v1_6, "heightInPixels");

    @property(Carousel.timerProperty)
    timer?: number;

    @property(Carousel.initialPageProperty)
    initialPageIndex: number = 0;

    @property(Carousel.loopProperty)
    carouselLoop: boolean = true;

    @property(Carousel.orientationProperty)
    carouselOrientation: Enums.Orientation = Enums.Orientation.Horizontal;

    @property(Carousel.carouselHeightProperty)
    carouselHeight?: number;

    protected populateSchema(schema: SerializableObjectSchema) {
        super.populateSchema(schema);

        // `style`, `bleed` and `isVisible` are not supported on a Carousel.
        schema.remove(
            StylableCardElementContainer.styleProperty,
            ContainerBase.bleedProperty,
            CardElement.isVisibleProperty
        );
    }

    //#endregion

    protected getItemsCollectionPropertyName(): string {
        return "pages";
    }

    addPage(page: CarouselPage) {
        page.setParent(this);
        this._items.push(page);
    }

    getPageCount(): number {
        return this._items.length;
    }

    getPageAt(index: number): CarouselPage {
        return this._items[index] as CarouselPage;
    }
}
