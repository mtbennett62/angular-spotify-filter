import { Component, OnInit } from '@angular/core';
import { stringify } from 'qs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  requestAuthorisation() {
    const localIp = environment.IPAddress;
    const baseUri = "https://accounts.spotify.com/authorize";
    const client_id = "f25295b75799480f830788678c0fc547";
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

    // const authorisationUri = `${baseUri}?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    const uri = `${baseUri}?${stringify(query)}`;
    console.log(uri);
    // console.log(authorisationUri);
    
    // this.router.navigate([uri]);
    // window.location.replace(authorisationUri);
    window.location.replace(uri);
  };
}
