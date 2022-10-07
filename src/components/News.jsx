import React, { Component } from "react";
import LoadingGraphics from "./LoadingGraphics";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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
      page: 1,
      pageLoaded: false,
      totalResults: 0,
    };
    this.maxPages = 0;
  }

  async componentDidMount() {
    await this.makeRequest();
  }

  async makeRequest() {
    const API_KEY = process.env.REACT_APP_API_KEY;

    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const response = await fetch(url);
    const jsonData = await response.json();

    this.setState({
      articles: jsonData.articles,
      totalResults: jsonData.totalResults,
      page: this.state.page + 1,
    });
  }

  fetchMoreData = async () => {
    await this.setState((prev) => ({
      page: prev.page + 1,
    }));

    const API_KEY = process.env.REACT_APP_API_KEY;
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    this.setState({
      articles: this.state.articles.concat(jsonData.articles),
    });
  };

  render() {
    return (
      <div className="">
        <h1 className="text-xl text-center font-bold my-4">
          Today's Headlines
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<LoadingGraphics />}
        >
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
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
