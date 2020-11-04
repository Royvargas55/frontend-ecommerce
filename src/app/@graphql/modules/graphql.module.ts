import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { NgModule } from '@angular/core';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphqlModule {
  constructor(apollo: Apollo, httpLink: HttpLink ) {
    // Para capturar los errores de connsulta y/o red
    const errorLink = onError(({graphQLErrors, networkError})=>{
      if (graphQLErrors){
        console.log('GarpgQL Errors', graphQLErrors);
      }

      if (networkError){
        console.log('network Error', networkError);
      }
    });
    const uri = 'http://localhost:2003/graphql';
    const link = ApolloLink.from(
      [
        errorLink,
        httpLink.create({uri})
      ]
    );
    apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
}
