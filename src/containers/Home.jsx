import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';
import EventList from '../components/EventList';
import { getEvents } from '../actions/index';
// import Splash from '../components/Splash';
import Playlist from '../components/Playlist';
// import * as types from '../constants/actionTypes';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEventList: false,
      showPlaylist: false,
      username: '',
    };
  }

  handleUsername(username) {
    console.log('PROPS CONS', this.props);
    this.setState({ username: username.target.value });
  }

  // onGenerateClick = (username) => {
  //   console.log('Called+++++++++')
  //   this.props.getEvents(username)
  //     .then(() => {
  //       this.setState({ showEventList: true });
  //     });
  // }

  handleSubmit(e) {
    const that = this;
    e.preventDefault();
    axios.get(`/api/events/${this.state.username}`)
    .then(function (response) {
      console.log(response, 'RESPONSE HERE');
      console.log('PROPS', this.props);
      that.props.getEvents(response);
      that.setState({ showEventList: true });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  renderPlaylist(playListID) {
    console.log('AH! REAL MONSTERS');
    this.setState({ showPlaylist: true });
  }
  render() {
    const settings = {
      dots: true,
      dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      fade: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 6000,
    };
    return (
      <div>
        <div>
          <div className="home-page-container">
            <div className="carousel">
              <Slider {...settings}>
                <div><img className="carousel-image" src="http://placekitten.com/g/450/300" alt="Sad Face" /></div>
                <div><img className="carousel-image" src="http://www.petsworld.in/blog/wp-content/uploads/2014/09/cute-kittens.jpg" alt="Sad Face" /></div>
                <div><img className="carousel-image" src="https://static.pexels.com/photos/37337/cat-silhouette-cats-silhouette-cat-s-eyes.jpg" alt="Sad Face" /></div>
                <div><img className="carousel-image" src="https://photogenicfelines.files.wordpress.com/2010/10/imgp7340_1-1.jpg" alt="Sad Face" /></div>
              </Slider>
            </div>
            <div id="songkik-input">
              <form className="form-inline">
                <span className="sr-only">Songkik Username</span>
                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                  <div className="input-group-addon">@</div>
                  <input
                    type="text" className="form-control"
                    id="inlineFormInputGroup" placeholder="Songkik Username"
                    value={this.state.username} onChange={this.handleUsername.bind(this)}
                  />
                </div>
                <button
                  type="submit" className="btn btn-primary"
                  onClick={this.handleSubmit.bind(this)}
                >
                Submit
                </button>
              </form>
              <span className="or-label"> OR </span>
              <div className="genre-buttons">
                <button type="button" className="btn btn-success btn-circle btn-lg">
                  Pop
                </button>
                <button type="button" className="btn btn-success btn-circle btn-lg">
                  Rock
                </button>
                <button type="button" className="btn btn-success btn-circle btn-lg">
                  Hip<br />Hop
                </button>
                <button type="button" className="btn btn-success btn-circle btn-lg">
                  Indie
                </button>
                <button type="button" className="btn btn-success btn-circle btn-lg">
                  Rap
                </button>
              </div>
            </div>
          </div>

        </div>
        <ToggleDisplay show={this.state.showEventList}>
          <EventList
            renderPlaylist={playListID => this.renderPlaylist(playListID)}
            listings={this.props.listings}
          />
        </ToggleDisplay>
        <ToggleDisplay show={this.state.showPlaylist}>
          <Playlist />
        </ToggleDisplay>
      </div>
    );
  }
}

const mapStatetoProps = ({ events }) => {
  console.log('EVENT MAPPING', events);
  return {
    listings: events.eventListings,
  };
};

export default connect(mapStatetoProps, { getEvents })(Home);


/* <div>
  <EventList listings={this.props.listings} />
</div>*/
