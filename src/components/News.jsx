import React, { Component } from "react";
import LoadingGraphics from "./LoadingGraphics";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    category: "general",
    pageSize: 10,
  };

  static propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      pageNum: 1,
      pageLoaded: false,
    };
    this.maxPages = 0;
    this.handlePageTurn = this.handlePageTurn.bind(this);
  }

  async componentDidMount() {
    await this.makeRequest();
  }

  async makeRequest() {
    const API_KEY = process.env.REACT_APP_API_KEY;
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${API_KEY}&page=${this.state.pageNum}&pageSize=${this.props.pageSize}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    this.maxPages = Math.ceil(jsonData.totalResults / this.props.pageSize);
    this.setState({
      articles: jsonData.articles,
      pageLoaded: true,
    });
    // console.log(url);
    console.log(jsonData);
  }

  async handlePageTurn(turn) {
    await this.setState((prevState) => {
      return {
        pageNum: prevState.pageNum + turn,
        pageLoaded: false,
      };
    });
    await this.makeRequest();
  }

  render() {
    return (
      <div className="">
        <h1 className="text-xl text-center font-bold my-4">
          Today's Headlines
        </h1>
        {this.state.pageLoaded || <LoadingGraphics />}
        {this.state.pageLoaded && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4 px-2 pt-4">
            {this.state.articles?.map(
              ({
                author,
                title,
                description,
                url,
                urlToImage,
                publishedAt,
                source,
              }) => (
                <NewsItem
                  key={url}
                  author={author}
                  title={title}
                  description={description}
                  url={url}
                  urlToImage={urlToImage}
                  publishedAt={publishedAt}
                  source={source}
                />
              )
            )}
          </div>
        )}
        <div className="flex justify-between px-4 mt-4">
          <button
            className="bg-orange-400 py-2 px-4 rounded-sm font-semibold text-orange-100 disabled:bg-gray-400 disabled:text-gray-300"
            onClick={() => this.handlePageTurn(-1)}
            disabled={this.state.pageNum === 1}
          >
            &larr; Prev
          </button>
          <button
            className="bg-orange-400 py-2 px-4 rounded-sm font-semibold text-orange-100 disabled:bg-gray-400 disabled:text-gray-300"
            onClick={() => this.handlePageTurn(1)}
            disabled={this.state.pageNum >= this.maxPages}
          >
            Next&rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
