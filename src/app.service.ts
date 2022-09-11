import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';
import { AxiosResponse } from 'axios';
import { Octokit } from '@octokit/rest';
@Injectable()
export class AppService {
  constructor (private readonly httpService:HttpService){};
  public GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  public GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

  async getToken(code:string){
    console.log("code = ", code);
    let data;
    let observer = {
      next: (value)=>{
        console.log(value);
      },
      error:(err)=>{
        console.error(err);
      },
      complete:(res)=>{
        data = res;
        return;
      }
    };

    // const body = (await this.httpService.get(this.DATA_URL).toPromise()).data;
    const body = await this.httpService.get(`https://github.com/login/oauth/access_token?client_id=${this.GITHUB_CLIENT_ID}&client_secret=${this.GITHUB_CLIENT_SECRET}&code=${code}`).toPromise().then(res => data = res).catch(err => {console.error(err)});

    let t = body['data'];
    // console.log("t = ", t);

    let token = t.split('&')[0].split('=')[1]
    return token;

  }
  async create(access_token:string){
    const octokit = new Octokit({
      auth: access_token
    })
    
    let response = await octokit.request('POST /repos/jainachal03/temprep/generate', {
      owner: '',
      name: 'New Repository.',
      description: 'This has been created for testing purposes.',
      include_all_branches: false,
      'private': false
    }).then(res => res.data).catch(err=> {console.error(err)});
    
  }
  getHello(): string {
    return 'Hello World!';
  }
}
