import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Newsitem from './Newsitem'; // Import Newsitem component

export default class Favourites extends Component {
  static propTypes = {
    savedNews: PropTypes.instanceOf(Set).isRequired // Define PropTypes for savedNews prop
  }

  render() {
    return (
      <div>
        <h2>Favourites</h2>
        {/* Map through savedNews Set and render each saved news item */}
        {Array.from(this.props.savedNews).map((id, index) => (
          <Newsitem
            key={index}
            title={`Saved News ${index + 1}`} // You can customize this title as per your requirement
            // Add other props as needed for each saved news item
          />
        ))}
      </div>
    );
  }
}
