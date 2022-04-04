import {Availability} from "../views/ItemView";
import {IItemCardComponent, ItemCard} from "../components/ItemCard";
import {CategoryCard, ICategoryCardComponent} from "../components/CategoryCard";

// TODO Those args are temporary
const CardFactory = (cardCount: number = 1, cardType: string[]): (IItemCardComponent | ICategoryCardComponent)[] => {

    const mock_item = (i: number): IItemCardComponent => {
        return <ItemCard {...{
            id: i.toString(),
            name: "Item " + i.toString(),
            description: "Description of #" + i.toString(),
            imageId: "",
            availability: Availability.Available,
            historyId: ""
        }}/>
    }
    const mock_category = (i: number): ICategoryCardComponent => {
        return <CategoryCard
            description={""}
            imageId={""}
            id={i.toString()}
            name={"Category " + i.toString()}
        />
    }

    const lut = ["item", "category"];

    const mock_cards = [mock_item, mock_category];

    const get_random = (list: string[]): string => {
        return list[Math.floor((Math.random() * list.length))];
    }

    return [...Array(cardCount)].map((value, index) =>
        mock_cards[lut.indexOf(get_random(cardType))](index)
    );
};

export default CardFactory;