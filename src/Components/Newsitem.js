import React, { Component } from 'react';
import News from './News';

export default class Newsitem extends Component {
  constructor() {
    super();
    this.state = {
      saved: false
    };
  }

  addtosave = () => {
    // Set the saved state to true
    this.setState({
      saved: true
    });
    // Call a function to save this news item, you can implement this function in the News component
    this.props.onSave(this.props.id);
    alert("Add to Fav ❤️")
  }

  removefromsave = () => {
    this.setState({
        saved: false
    });
    this.props.onRemove({
        title: this.props.title,
        description: this.props.description,
        urlToImage: this.props.image
    });
    alert("Remove from Fav ❤️");
  }

  shareArticle = () => {
    // Define the URL of the article to share
    const articleUrl = this.props.more;
    
    // Use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: this.props.title,
        url: articleUrl
      }).then(() => {
        console.log('Article shared successfully');
      }).catch((error) => {
        console.error('Error sharing article:', error);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      alert("Sharing is not supported in this browser");
    }
  };

  render() {
    const { title, description, image, more, author, date } = this.props;
    return (
      <>
        <div className='my-3'>
          <div className="card">
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
              <a href={more} target='_blank' className="btn btn-sm btn-primary">Read More</a>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "end", position: "relative", top: "-33px" }}>
                {this.state.saved ? 
                  <button style={{ border: 'none', backgroundColor: "transparent" }} onClick={this.removefromsave}>
                    <i className="fa-solid fa-bookmark" style={{ color: "#3024db", fontSize: "2em" }}></i>
                  </button> :
                  <button style={{ border: 'none', backgroundColor: "transparent" }} onClick={this.addtosave}>
                    <i className="fa-regular fa-bookmark" style={{ color: "#3024db", fontSize: "2em" }}></i>
                  </button>
                }
                <button style={{ border: 'none', backgroundColor: "transparent" }} onClick={this.shareArticle}><i className="fa-solid fa-share" style={{marginLeft: "10px", fontSize: "1.5em"}}></i></button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
