import React, { Component } from "react";

export class NewsItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.source);
    return (
      <div>
        <a
          className="relative group block overflow-hidden shadow-sm hover:bg-orange-200 hover:shadow-md"
          href={this.props.url}
        >
          <img
            className="object-cover w-full h-56"
            src={this.props.urlToImage || "tempImage.gif"}
            alt=""
          />
          <div className="w-full h-56 bg-gradient-to-t from-transparent to-orange-400 opacity-50 group-hover:opacity-0 top-0 absolute"></div>
          <p className="absolute top-1 right-0 bg-orange-400 px-1 text-gray-300">
            {" "}
            {this.props.source.name || "Unknown"}
          </p>
          <div className="p-2">
            <h5 className="text-xl font-bold line-clamp-2">
              {this.props.title}
            </h5>

            <p className="mt-1 text-sm line-clamp-2">
              {this.props.description}
            </p>

            <p className="mt-2 text-sm text-orange-400">
              Written by {this.props.author || "Anonymous"}
            </p>

            <p className="text-[0.75em] text-gray-500">
              {new Date(this.props.publishedAt).toUTCString()}
            </p>

            <div className="inline-block pb-1 mt-1 font-medium text-orange-400 border-b border-orange-400 ">
              Find out more
              <span aria-hidden="true">&rarr;</span>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default NewsItem;
