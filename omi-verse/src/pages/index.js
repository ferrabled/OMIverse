import Head from 'next/head';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';

import styles from '@styles/Home.module.scss';

const DEFAULT_CENTER = [38.907132, -77.036546]
const PARIS_LOCATION = [48.8566, 2.3522]
const FLORIDA_LOCATION = [27.6648, -81.5158]
const SEVILLE_LOCATION = [37.3891, -5.9845]
const CAPETOWN_LOCATION = [-33.9249, 18.4241]
const JAPAN_LOCATION = [36.2048, 138.2529]
const BANGKOK_LOCATION = [13.7563, 100.5018]

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>OMIverse APP</title>
        <meta name="description" content="OMIverse APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <Container>
          <h1 className={styles.title} style={{ fontSize: '24px', marginBottom: '20px' }}>
            Memory Universe
          </h1>

          <Map className={styles.homeMap} width="1800" height="800" center={DEFAULT_CENTER} zoom={3}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={PARIS_LOCATION}>
                  <Popup maxWidth="300px">
                    <div style={{ width: '280px' }}>
                      <img 
                        src="https://ipfs.io/ipfs/QmX2ryqySFLfDGPXmfQw78nTxMcwWtdUxL1iSCRrzFhbSK" 
                        alt="Paris Memory"
                        style={{ width: '100%', height: 'auto' }}
                      />
                      <p>Paris Memory</p>
                      <button 
                        onClick={() => window.open('https://eth-sepolia.blockscout.com/tx/0xc4c548de85667d794e2fcd1a37d86d94e04323a5567a6b2dff6c4087dbfe1b5c', '_blank')}
                        style={{ 
                          backgroundColor: '#FFD700',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        View Transaction
                      </button>
                    </div>
                  </Popup>
                </Marker>
                <Marker position={FLORIDA_LOCATION}>
                  <Popup maxWidth="400">
                    <div style={{ width: '350px' }}>
                      <img 
                        src="https://ipfs.io/ipfs/QmYgQrnGvSK38pQ9y1ys5nHxyyqsu5GUfhzMwptaPKjbFG" 
                        alt="Florida Memory"
                        style={{ width: '100%', height: 'auto' }}
                      />
                      <p>Florida Memory</p>
                      <button 
                        onClick={() => window.open('https://eth-sepolia.blockscout.com/tx/0xc4c548de85667d794e2fcd1a37d86d94e04323a5567a6b2dff6c4087dbfe1b5c', '_blank')}
                        style={{ 
                          backgroundColor: '#FFD700',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        View Transaction
                      </button>
                    </div>
                  </Popup>
                </Marker>
                <Marker position={SEVILLE_LOCATION}>
                  <Popup maxWidth="400">
                    <div style={{ width: '350px' }}>
                      <img 
                        src="https://ipfs.io/ipfs/QmW4cGjSj1a3oGatCwYppXho3sCd2Nt5HJzLA1VsX8xSEu" 
                        alt="Seville Memory"
                        style={{ width: '100%', height: 'auto' }}
                      />
                      <p>Seville Memory</p>
                      <button 
                        onClick={() => window.open('https://eth-sepolia.blockscout.com/tx/0xc4c548de85667d794e2fcd1a37d86d94e04323a5567a6b2dff6c4087dbfe1b5c', '_blank')}
                        style={{ 
                          backgroundColor: '#FFD700',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        View Transaction
                      </button>
                    </div>
                  </Popup>
                </Marker>
                <Marker position={CAPETOWN_LOCATION}>
                  <Popup maxWidth="400">
                    <div style={{ width: '350px' }}>
                      <img 
                        src="https://ipfs.io/ipfs/QmetqzXxdU6R4Pao55vdjdWqQC6xiGB16C2GwDhv2JBayS" 
                        alt="Cape Town Memory"
                        style={{ width: '100%', height: 'auto' }}
                      />
                      <p>Cape Town Memory</p>
                      <button 
                        onClick={() => window.open('https://eth-sepolia.blockscout.com/tx/0xc4c548de85667d794e2fcd1a37d86d94e04323a5567a6b2dff6c4087dbfe1b5c', '_blank')}
                        style={{ 
                          backgroundColor: '#FFD700',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        View Transaction
                      </button>
                    </div>
                  </Popup>
                </Marker>
                <Marker position={JAPAN_LOCATION}>
                  <Popup maxWidth="400">
                    <div style={{ width: '350px' }}>
                      <img 
                        src="https://ipfs.io/ipfs/QmTvRgTgwnCbTVz9bykxQdAJ7G6XcDfmVYbTfpGUjGTywt" 
                        alt="Japan Memory"
                        style={{ width: '100%', height: 'auto' }}
                      />
                      <p>Japan Memory</p>
                      <button 
                        onClick={() => window.open('https://eth-sepolia.blockscout.com/tx/0xc4c548de85667d794e2fcd1a37d86d94e04323a5567a6b2dff6c4087dbfe1b5c', '_blank')}
                        style={{ 
                          backgroundColor: '#FFD700',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        View Transaction
                      </button>
                    </div>
                  </Popup>
                </Marker>
                <Marker position={BANGKOK_LOCATION}>
                  <Popup maxWidth="400">
                    <div style={{ width: '350px' }}>
                      <img 
                        src="https://ipfs.io/ipfs/bafybeiavwsxivqxizjz3w2jq2j527w4lmuzc63pft5ipfayymv5ttglvr4" 
                        alt="Bangkok Memory"
                        style={{ width: '100%', height: 'auto' }}
                      />
                      <p>Bangkok Memory</p>
                      <button 
                        onClick={() => window.open('https://eth-sepolia.blockscout.com/tx/0xc4c548de85667d794e2fcd1a37d86d94e04323a5567a6b2dff6c4087dbfe1b5c', '_blank')}
                        style={{ 
                          backgroundColor: '#FFD700',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        View Transaction
                      </button>
                    </div>
                  </Popup>
                </Marker>
              </>
            )}
          </Map>
        </Container>
      </Section>
    </Layout>
  )
}
