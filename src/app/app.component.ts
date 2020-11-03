import { Component } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'angular-spotify-filter';

  constructor(private router: Router){
  }
  requestAuthorisation() {
    const localIp = environment.IPAddress;
    const client_id = environment.clientId;
    const baseUri = "https://accounts.spotify.com/authorize";
    const redirect_uri = `http://${localIp}:4200/home`;

    const scope = [
      "playlist-read-collaborative",
      "playlist-modify-private",
      "playlist-modify-public",
      "playlist-read-private"
    ].join(" ");

    const query = {
      client_id,
      response_type: "token",
      redirect_uri,
      scope
    };

    const authorisationUri = `${baseUri}?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    const uri = `${baseUri}?${JSON.stringify(query)}`;
    console.log(uri);
    console.log(authorisationUri);
    
    // this.router.navigate([uri]);
    window.location.replace(authorisationUri);
  };
}
