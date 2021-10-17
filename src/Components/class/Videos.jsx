import "../style/Card_Article/card-article.css";
import React from "react";
import axios from "axios";
import qs from "querystring";

const api = "http://192.168.196.12:8000/api/videos";

class Videos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      response: "",
    };
  }

  componentDidMount() {
    axios.get(api).then((res) => {
      console.log("berhasil ambil api", res);
      this.setState({
        videos: res.data.data,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.videos.map((video) => (
          <div key={video.id} className="card-article">
            {/* <img src="https://img.youtube.com/vi/9l-ti-tT9xw/sddefault.jpg" alt="" className="card-article-image" /> */}
            <iframe width="360" height="315" src="https://www.youtube.com/embed/9l-ti-tT9xw?controls=0" className="card-article-image"></iframe>
            <h3 className="card-article-title">{video.title}</h3>
            <p className="card-article-date">{video.updated_at}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Videos;
