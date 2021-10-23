import React, { Fragment, useState } from "react";
import { gql } from "graphql-tag";
import { Query } from "react-apollo";
import KarakterItem from "./KarakterItem";

const KARAKTER_QUERY = gql`
  query KarakterlerQuery($sayfa: Int) {
    karakterler(sayfa: $sayfa) {
      id
      name
      gender
      status
      image
    }
  }
`;
const KARAKTERBILGI_QUERY = gql`
  query karakterlerBilgiQuery($sayfa: Int!) {
    karakterBilgi(sayfa: $sayfa) {
      pages
      next
      prev
    }
  }
`;

export default function Karakterler() {
  const [sayfa, setsayfa] = useState(1);
  const ilkSayfayaGit = () => {
    setsayfa(1);
  };
  const geriGit = (prev) => {
    if (prev != null) {
      setsayfa(sayfa - 1);
    }
  };
  const ileriGit = (next) => {
    if (next != null) {
      setsayfa(sayfa + 1);
    }
  };
  const sonSayfayaGit = (pages) => {
    setsayfa(pages);
  };
  return (
    <>
      <h2 className="display-4 my-3">Karakterler</h2>
      <Query query={KARAKTERBILGI_QUERY} variables={{ sayfa }}>
        {({ loading, error, data }) => {
          return (
            <Fragment>
              <button
                className="btn btn-info m-3"
                onClick={() => ilkSayfayaGit()}
              >
                İlk Sayfa
              </button>
              <button
                className="btn btn-outline-danger m-3"
                onClick={() => geriGit(data.karakterBilgi.prev)}
              >
                Geri Git
              </button>
              <button
                className="btn btn-outline-warning m-3"
                onClick={() => ileriGit(data.karakterBilgi.next)}
              >
                İleri Git
              </button>
              <button
                className="btn btn-info m-3"
                onClick={() => sonSayfayaGit(data.karakterBilgi.pages)}
              >
                Son Sayfa
              </button>
            </Fragment>
          );
        }}
      </Query>

      <Query query={KARAKTER_QUERY} variables={{ sayfa }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Yükleniyor</h4>;
          if (error) return <h4>Hata</h4>;
          return (
            <Fragment>
              {data.karakterler.map((karakter) => (
                <KarakterItem key={karakter.id} karakter={karakter} />
              ))}
            </Fragment>
          );
        }}
      </Query>
    </>
  );
}
