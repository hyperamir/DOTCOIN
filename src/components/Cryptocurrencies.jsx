import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const [searchTerm, setSearchTerm] = useState('')
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  console.log(cryptoList)
  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    setCryptos(filteredData);
  }, [cryptoList, searchTerm])

  if (isFetching) return 'Loading...';
  return (
    <>
      {!simplified && <div className="search-crypto">
        <Input placeholder="Search Cryptocurrency" onChange={(event) => setSearchTerm(event.target.value)} />
      </div>}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map(currency => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link to={`crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {currency.price > 10 ? millify(currency.price) : Number(currency.price).toFixed(7)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;