import "../style/Card_Article/card-article.css";
import React from "react";
import axios from "axios";
import qs from "querystring";

const api = "http://192.168.196.12:8000/api/articles";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      response: "",
    };
  }

  componentDidMount() {
    axios.get(api).then((res) => {
      console.log("berhasil ambil api", res);
      this.setState({
        article: res.data.data.data,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.article.map((article) => (
          <div key={article.id} className="card-article">
            <img src={article.image_url} alt="" className="card-article-image" />
            <h3 className="card-article-title">{article.title}</h3>
            <p className="card-article-date">{article.updated_at}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Article;
