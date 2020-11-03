import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


let token = "";

@Injectable({
  providedIn: 'root'
})
export class SpotifyServiceService {

  constructor(private http: HttpClient, private router: ActivatedRoute) { }

  getToken() {
    const cookies = decodeURIComponent(document.cookie);
    const cookieArray = cookies.split(";");
    const cookieName = 'token';

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];

      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length).slice(1);
      }
    }
    return "";
  }

  async getSpotifyData(endpoint: string) {
    const token = this.getToken();
    const header = {
      Authorization: `Bearer ${token}`
    };
    const options = {
      headers: header
    };
    let result = [];
    const uri = `https://api.spotify.com/v1/${endpoint}`;
    // this.http.get(uri, options)
    //   .then((response) =>{ 
    //     return response.items;
    //     console.log(response.items);s
    //   });
    const response = await fetch(uri, {
      method: "GET",
      headers: header
    });
    try {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Service not currently available");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  getFeaturedPlaylists() {
    return this.getSpotifyData('browse/featured-playlists').then((response) => {
      console.log(response);
      return response ? response.playlists.items : []
    });
  }
  getUsersPlaylists() {
    return this.getSpotifyData('me/playlists').then((response) => {
      return response ? response.items : []
    });
  }

  getTracksFromPlaylist(id: string) {
    return this.getSpotifyData(`playlists/${id}/tracks`).then((response) => {
      return response ? response.items : []
    });

  }
  getTrackInformation(href: string) {
    const temp = href.slice(27);
    return this.getSpotifyData(temp).then((response) => {
      return response
    });
  }
}