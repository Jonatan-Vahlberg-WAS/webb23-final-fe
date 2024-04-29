import { useRecipies } from "@/contexts/recipies";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const { useState } = require("react");
const { Input } = require("../ui/input");

const RecipieForm = () => {
    const recipies = useRecipies();
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([
    {
      name: "",
      quantity: "",
      unit: "",
    },
  ]);
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      ingredients,
      steps,
      image: "https://source.unsplash.com/random?food5.jpg",
    };
    if (
      data.title === "" ||
      data.ingredients.length === 0 ||
      data.steps.length === 0
    ) {
      alert("Please fill out all fields");
      return;
    }
    delete data.steps
    delete data.title
      console.log("new recipie", data);
      recipies.createRecipie(data)
      // e.target.reset();
      // setSteps([""]);
        // setIngredients([ { name: "", quantity: "", unit: "" }]);
    //TODO: Send data to server
  };
  return (
    <form onSubmit={onSubmit} className="p-4 bg-stone-200">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-5">
        Create Recipie
      </h2>
      <div className="grid gap-4 md:gap-6">
        <div className="grid gap-2">
          <Label className="text-base" htmlFor="title">
            Title
          </Label>
          <Input type="text" id="title" name="title" />
        </div>
        <div className="grid gap-2">
          <Label className="text-base" htmlFor="ingredients">
            Ingredients
          </Label>
          <IngredientsInput items={ingredients} setItems={setIngredients} />
          <input
            type="hidden"
            name="ingredients"
            value={ingredients.join(",")}
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-base" htmlFor="instructions">
            Instructions
          </Label>
          <StepsInput items={steps} setItems={setSteps} />
          <input type="hidden" name="instructions" value={steps.join(",")} />
        </div>
        <div className="grid gap-2">
          <Button type="submit">Create Recipie</Button>
        </div>
      </div>
    </form>
  );
};

const StepsInput = ({ items, setItems }) => {
  const addItem = () => {
    setItems([...items, ""]);
  };
  const removeItem = (index) => {
    setItems([...items.slice(0, index), ...items.slice(index + 1)]);
  };
  const updateItem = (index, value) => {
    setItems([...items.slice(0, index), value, ...items.slice(index + 1)]);
  };
  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
          />
          <button type="button" onClick={() => removeItem(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addItem}>
        Add
      </button>
    </div>
  );
};

const IngredientsInput = ({ items, setItems }) => {
  const addItem = () => {
    setItems([...items, { name: "", quantity: "", unit: "" }]);
  };
  const removeItem = (index) => {
    setItems([...items.slice(0, index), ...items.slice(index + 1)]);
  };
  const updateItem = (index, value, name) => {
      setItems(prev => { 
            const newItems = [...prev];
            newItems[index][name] = value;
            return newItems;
      });
  };
  return (
    <div className="flex flex-col items-start gap-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 bg-slate-200 p-2"
        >
          <div className="grid gap-2">
            <Label className="text-base" htmlFor={`ingredient-${index}`}>
              Ingredient
            </Label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(index, e.target.value, "name")}
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor={`quantity-${index}`}>
              Quantity
            </Label>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateItem(index, e.target.value, "quantity")}
              className="w-20"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor={`unit-${index}`}>
              Unit
            </Label>
            <input
              type="text"
              value={item.unit}
              className="w-20"
              onChange={(e) => updateItem(index, e.target.value, "unit")}
            />
          </div>

          <button type="button" onClick={() => removeItem(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addItem}>
        Add
      </button>
    </div>
  );
};

export default RecipieForm;
