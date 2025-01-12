import React from "react";
import { Link } from "react-router-dom";

export default class TriangleAngle extends React.Component {
    render() {
      return (
        <div>
          <div className="flex justify-center">
            <div className="text-5xl w-min font-semibold text-center mt-6 mb-6 text-green-600">
              <Link to="/">MultiCalculator</Link>
            </div>
          </div>
        </div>
      );
    }
  }