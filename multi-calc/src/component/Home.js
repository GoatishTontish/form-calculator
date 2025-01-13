import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  routerNaming(category) {
    return category.replace(/\s+/g, "");
  }

  setCategories() {
    const categories = [
      "Basic Calculator",
      "Basic Calculator 2",
      "Scientific Calculator",
      "Triangle Pythagoras",
      "Triangle angle",
    ];

    const showCategories = categories.map((category, index) => (
      <Link to={`/${this.routerNaming(category)}`}>
        <li
          key={index}
          className="border text-center border-black hover:bg-gray-400 bg-gray-200"
        >
          {category}
        </li>
      </Link>
    ));

    return (
      <ul className="list-none grid text-xl font-semibold m-1 laptop:m-12 laptop:mr-[20%] laptop:ml-[20%]">
        {showCategories}
      </ul>
    );
  }



  render() {
    return (
      <div className="font-comfortaa">
        <div className="flex justify-center">
          <div className="text-5xl w-min font-semibold text-center mt-6 mb-6 text-green-600"><Link to="/">MultiCalculator</Link></div>
        </div>
        {this.setCategories()}
      </div>
    );
  }
}
