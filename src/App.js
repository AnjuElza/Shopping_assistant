//import logo from './logo.svg';
import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Pagination from '@mui/material/Pagination';
import axios from "axios";
const mixers = [
  {
    id:1,
    img: "https://m.media-amazon.com/images/I/51a5GWUyz5L._SX679_.jpg",
    title: "Wonderchef Vietri 500 Watt Mixer Grinder"
  },
  {
    id:2,
    img: "https://m.media-amazon.com/images/I/41gZhEcCCQL._SX300_SY300_QL70_FMwebp_.jpg",
    title: "Wonderchef Nutriblend 400W Mixer "
  },
  {
    id:3,
    img: "https://m.media-amazon.com/images/I/41zr2i4M3FL._SX300_SY300_QL70_FMwebp_.jpg",
   title: "Prestige Deluxe VS 750W Mixer Grinder"
  },
  {
    id:4,
    img: "https://m.media-amazon.com/images/I/41MJtzx-VbL._SX300_SY300_QL70_FMwebp_.jpg",
    title: "Prestige Nakshatra Plus 750W Mixer Grinder"
  },
 {
    id:5,
    img: "https://m.media-amazon.com/images/I/31AnEQz5zUS._SY300_SX300_QL70_FMwebp_.jpg",
    title: "Prestige Stylo V2 750W Mixer Grinder"
  },
  {
    id:6,
    img: "https://m.media-amazon.com/images/I/31kH2o3mGxS._SX300_SY300_QL70_FMwebp_.jpg",
    title: "Orpat Mixer Grinder Kitchen Majestic"
  },
  {
    id:7,
    img: "https://m.media-amazon.com/images/I/31e+LYu9HSL._SY300_SX300_.jpg",
    title: "Lifelong llcmb02 500W Mixer Grinder"
  },
 {
    id:8,
    img: "https://m.media-amazon.com/images/I/31uDJciyJdL._SX300_SY300_QL70_FMwebp_.jpg",
    title: "Florita Vinca 450W Mixer Grinder"
  },
  {
    id:9,
    img: "https://m.media-amazon.com/images/I/31RW094g6ZL._SX300_SY300_QL70_FMwebp_.jpg",
    title: "Florita Pine 500W Mixer Grinder"
 },
  {
    id:10,
   img: "https://m.media-amazon.com/images/I/418Gt0kIInL._SX300_SY300_QL70_FMwebp_.jpg",
   title: "Pringle Real Juicer Mixer Grinder"
 }
];

// const API="http://localhost:4000";
const API="https://easy-ray-slippers.cyclic.app";

function App() {
  const [show, setShow]= useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [search, setSearch]= useState("");
  const [active, setActive]= useState("ProductList");
 
   const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }
 
  const handleOnSelect = (item) => {
    // the item selected
   
    console.log(item)
   
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.title}</span>
      </>
    )
  }
  return (
    <><><><div className="navbar">

      <h1 className="main-heading">SHOPPING ASSISTANT</h1>
      <h3>Department: Electronics Items(Mixers)</h3>



      {/*search bar*/}
      <div style={{ width: 400 }}>
        <ReactSearchAutocomplete
      value={search}
      items={mixers}
      fuseOptions={{ keys: ["title",] }}
      resultStringKeyName="title"
      onSearch={handleOnSearch}
      onHover={handleOnHover}
      onSelect={handleOnSelect}
      onFocus={handleOnFocus}
      autoFocus
      formatResult={formatResult}
      onChange = {(event)=>setSearch(event.target.value)&& setActive("searchResult")}
      placeholder="Search" />
      </div>

    </div>

    </><div className="data-container">
    <div className="mixer-list-container">
        {/* {active === "searchResult" &&
          { search }
  
        <Mixer mixers={mixers.filter((mv) => mv.title.toLowerCase().includes(search.toLowerCase())
        )} />
       */}
      
      {/* {active === "ProductList" && */}
        

          {mixers.map((mxr) => (

            <div className="mixer-container">
              <Mixer mixers={mxr} />
              <button className="button-view-details"
                onClick={() => {
                  setActiveIndex(mxr.id);
                  if (activeIndex === mxr.id) {
                    setShow(!show);
                  }
                } }>
                View Details
              </button>
              {show && (activeIndex === mxr.id) ? <MixerDetails id={mxr.id} /> : null}

            </div>
          ))}
          </div>
        </div>

    </><div className='footer'>
        <Pagination count={1} variant="outlined" shape="rounded" />
      </div></>
  
  );
}

function Mixer({mixers}){
  
    return(
      <div>
       
        <img src={mixers.img} alt={mixers.title} className="mixer-picture" />
        <h2 className="mixer-name">{mixers.title}</h2>
      </div>
    );
  }

  function MixerDetails({id}){
    //console.log(id);
    const [snapdeal_data, setSnapdeal_data]= useState([]);
    const [amazon_data, setAmazon_data]= useState([]); 
    // const snapdeal_data1= React.useRef([]);
    useEffect(()=>{
      fetch(`${API}/amzn_data_db`)
          .then((data)=>data.json())
          .then((amzn)=>setAmazon_data(amzn));
      console.log(amazon_data);
      fetch(`${API}/snpdl_data_db`)
          .then((data)=>data.json())
          .then((snpdl)=>setSnapdeal_data(snpdl));
          console.log(snapdeal_data);
    },[]);
    // snapdeal_data1.current=snapdeal_data;
    // let snapdeal_array = JSON.parse(JSON.stringify(snapdeal_data1));
    //  let snapdeal_data_sorted = snapdeal_array.sort((a, b) => {
    //    if (a.id < b.id) {
    //      return -1;
    //    }
    //  });
     //  snapdeal_data1.current=snapdeal_data_sorted;
    // console.log(snapdeal_data1);
    //const amazon_mixer_data={amazon_data.filter(mv) => (mv.id=== id)}
    const  id1=id-1;
    return(
        <>
        <div>
        <h4>Product Details</h4>
        <div className="data-container">
          <table className='data-table'>
            <thead><tr>
              <th>Website</th>
              <th>Amazon</th>
    
              <th>Snapdeal</th>
              </tr></thead>
            <tbody>
            <tr>
              <th>Price</th>
              <td>{amazon_data[id1]?.price}</td>
              <td>{snapdeal_data[id1]?.price}</td>
            </tr>
            <tr>
              <th>Offer Price</th>
              <td>{amazon_data[id1]?.offer_price}</td>
              
              <td>{snapdeal_data[id1]?.offer_price}</td>
            </tr>
            <tr>
              <th>Rating</th>
              <td>{amazon_data[id1]?.rating}</td>
              
              <td>{snapdeal_data[id1]?.rating}</td>
            </tr>
            <tr>
              <th>URL</th>
              <td><a href={amazon_data[id1]?.url} target="_blank">Amazon Link</a></td>
              
              <td><a href={snapdeal_data[id1]?.url} target="_blank">Snapdeal Link</a></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div></>  
      );
  } 
  

export default App;
