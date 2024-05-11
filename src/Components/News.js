import React, { Component } from 'react';
import Newsitem from "./Newsitem";
import Loading from './Loading';

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      headlines: [],
      Page: 1,
      maxpage: 1,
      load: false,
      category: "business",
      savedNews: new Set(),
      showFavorites: false,
    };
  }

  async componentDidMount() {
    await this.fetchNews();
  }

  fetchNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?category=${this.state.category}&language=en&apiKey=a8887f387bf24bb9941b5fdeb7332d6a&page=${this.state.Page}&pageSize=12`;
    this.setState({ load: true })
    let data = await fetch(url);
    let readdata = await data.json();
    this.setState({ headlines: readdata.articles, maxpage: Math.ceil(readdata.totalResults / 10) });
    this.setState({ load: false })
  };

  // Event handler for category change
  handleCategoryChange = async (event) => {
    await this.setState({ category: event.target.value });
    this.fetchNews();
  };

  clickprev = async () => {
    await this.setState({ Page: this.state.Page - 1 });
    this.setState({ load: true })
    await this.fetchNews();
    this.setState({ load: false })
  };

  clicknext = async () => {
    await this.setState({ Page: this.state.Page + 1 });
    this.setState({ load: true })
    await this.fetchNews();
    this.setState({ load: false })
  };

  saveNews = (id) => {
    const { title, description, urlToImage } = this.state.headlines[id];
    this.setState(prevState => ({
      savedNews: prevState.savedNews.add({ title, description, urlToImage })
    }));
}


removeNews = (newsToRemove) => {
  const newSavedNews = new Set(this.state.savedNews);
  newSavedNews.forEach((news) => {
      if (news.title === newsToRemove.title &&
          news.description === newsToRemove.description &&
          news.urlToImage === newsToRemove.urlToImage) {
          newSavedNews.delete(news); // Remove the matching news object
      }
  });
  this.setState({ savedNews: newSavedNews });
}

  toggleFavorites = () => {
    this.setState(prevState => ({
      showFavorites: !prevState.showFavorites
    }));
  }

  gobackhome = () => {
    this.setState(prevState => ({
      showFavorites: !prevState.showFavorites
    }));
}

  render() {
    return (
      <>
        <div className='container my-3' style={{ display: this.state.showFavorites ? "none" : "block" }}>
          <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>Top Headlines</h1>
          <div className='filter' style={{ display: "flex", alignItems: 'center', justifyContent: "space-between"}}>
            <select name="category" style={{ height: "40px", borderRadius: "10px" }} id="category" onChange={this.handleCategoryChange}>
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
              <option value="general">General</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
            </select>
            <button type="button" className="btn btn-outline-primary me-2" onClick={this.toggleFavorites}>Favourites ❤️</button>
          </div>
          {this.state.load && <Loading />}
          <div className='row'>
            {!this.state.load && this.state.headlines.map((single, index) => {
              return (
                <div key={index}>
                  <Newsitem
                    id={index}
                    title={single.title ? single.title : "Breaking News"}
                    description={single.description ? single.description : "Description"}
                    image={single.urlToImage ? single.urlToImage : "https://imgs.search.brave.com/BzVYAM0Ae3a63YWh1dxYz52b3qPz8xWPPhIDERX-qKc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzA5LzUzLzEx/LzM2MF9GXzIwOTUz/MTEwM192TDVNYUY1/ZldjZHBWY1hrNXlS/RUJrM0tNY1hFMFg3/bS5qcGc"}
                    author={single.author ? single.author : "Unknown"}
                    date={single.publishedAt}
                    more={single.url}
                    onSave={this.saveNews}
                    onRemove={this.removeNews}
                  />
                </div>
              );
            })}
          </div>
          <div className='container d-flex justify-content-between'>
            <button type="button" disabled={this.state.Page === 1} className="btn btn-primary" onClick={this.clickprev}>← Prev</button>
            <button type="button" disabled={this.state.Page >= this.state.maxpage} className="btn btn-primary" onClick={this.clicknext}>Next →</button>
          </div>
        </div>
        <div className='fav' style={{ display: this.state.showFavorites ? "block" : "none" }}>
          <h2>Favourites</h2>
          <button type="button" className="btn btn-primary" onClick={this.gobackhome}>Home</button>
          {/* Map through savedNews Set and render each saved news item */}
          {Array.from(this.state.savedNews).map((news, index) => (
    <Newsitem
        key={index}
        title={news.title}
        description={news.description}
        image={news.urlToImage}
    />
))}
        </div>
      </>
    );
  }
}
