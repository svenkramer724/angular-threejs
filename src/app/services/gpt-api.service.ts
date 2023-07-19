import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GptApiService {
  headers: HttpHeaders;
  constructor(private client: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append(
      'Authorization',
      `Bearer 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`
    );
  }

  getAutoComplete(typing: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': '4eef9c4282msha693b79abf676f6p14c06cjsnc48f06ce9d13',
      'X-RapidAPI-Host': 'web-search-autocomplete.p.rapidapi.com',
    });

    return this.client
      .get(
        `https://web-search-autocomplete.p.rapidapi.com/autocomplete?query=${typing}&language=en&region=us`,
        { headers }
      )
      .pipe(
        map((res: any) => {
          return res.data.map((r: any) => r.query);
        })
      );
  }
  completion(content: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer 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',
    });
    const data = {
      prompt: `Suject 20 best prompt for "${content}"`,
      temperature: 0.7,
      max_tokens: 80,
    };
    return this.client
      .post(
        `https://api.openai.com/v1/engines/text-davinci-003/completions`,
        data,
        { headers }
      )
      .pipe(
        map((res: any) => {
          return res.choices[0].text;
        })
      );
  }

  askQuestion(content: string, role: string = 'user', model = 'gpt-3.5-turbo') {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer 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',
    });
    const data = {
      model,
      messages: [{ role, content }],
    };
    return this.client
      .post(`https://api.openai.com/v1/chat/completions`, data, { headers })
      .pipe(
        map((res: any) => {
          return res.choices[0].message;
        })
      );
  }
}
