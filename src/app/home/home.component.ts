import { Component, OnInit, Input } from '@angular/core';
import { SpotifyServiceService } from '../spotify-service.service';
import { parse } from 'querystring';

// let playlists = [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  @Input() userPlaylists: [];
  @Input() featuredPlaylists: [];
  @Input() tracks: [];
  constructor(private spotifyservice: SpotifyServiceService) { }

  ngOnInit(): void {
    this.saveToken();
  }
  saveToken = () => {
    let queryParams = parse(window.location.hash.substring(1));
    // , {
    //   ignoreQueryPrefix: true
    // }
    const { access_token } = queryParams;
    document.cookie = `token=${access_token}`;
  };

  getMyPlaylists() {
    return this.spotifyservice.getUsersPlaylists().then((result) => {
      this.userPlaylists = result;
      console.log(this.userPlaylists);
    });
  }

  getFeaturedPlaylists() {
    return this.spotifyservice.getFeaturedPlaylists().then((result) => {
      console.log(result);
      this.featuredPlaylists = result;
      console.log(this.featuredPlaylists);
    })
  }

  getTracks(id: string) {
    return this.spotifyservice.getTracksFromPlaylist(id).then((result) => {
      console.log(result);
      this.tracks = result;
      console.log(this.tracks);
    });
  }

  getTrackInformation(url: string) {
    return this.spotifyservice.getTrackInformation(url).then((result) => {
      console.log(result);
    });
  }

}
