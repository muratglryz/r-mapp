import React, { Fragment, useState } from "react";
import { gql } from "graphql-tag";
import { Query } from "react-apollo";
import KonumItem from "./KonumItem";

const KONUM_QUERY = gql`
  query KonumlarQuery($sayfa: Int) {
    konumlar(sayfa: $sayfa) {
      id
      name
      type
      dimension
    }
  }
`;
const KONUMBILGI_QUERY = gql`
  query konumlarBilgiQuery($sayfa: Int!) {
    konumBilgi(sayfa: $sayfa) {
      pages
      next
      prev
    }
  }
`;

export default function Konumlar() {
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
      <h2 className="display-4 my-3">Konumlar</h2>
      <Query query={KONUMBILGI_QUERY} variables={{ sayfa }}>
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
                onClick={() => geriGit(data.konumBilgi.prev)}
              >
                Geri Git
              </button>
              <button
                className="btn btn-outline-warning m-3"
                onClick={() => ileriGit(data.konumBilgi.next)}
              >
                İleri Git
              </button>
              <button
                className="btn btn-info m-3"
                onClick={() => sonSayfayaGit(data.konumBilgi.pages)}
              >
                Son Sayfa
              </button>
            </Fragment>
          );
        }}
      </Query>

      <Query query={KONUM_QUERY} variables={{ sayfa }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Yükleniyor</h4>;
          if (error) return <h4>Hata</h4>;
          return (
            <Fragment>
              {data.konumlar.map((konum) => (
                <KonumItem key={konum.id} konum={konum} />
              ))}
            </Fragment>
          );
        }}
      </Query>
    </>
  );
}
