import './Home.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { fetchGet } from '../../services/HttpService';
import { wait } from '../../services/UtileService';
import ReactPaginate from 'react-paginate';
import { addMonster, emptyMonsters } from '../../store/monsters.slice';
import { Blocks } from 'react-loader-spinner';

const Home = (props) => {
    //const [allmonsters, setAllmonsters] = useState([]);
    const allmonsters = useSelector((state) => state.monsters);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 8;
    const pagesVisited = pageNumber * itemsPerPage;

    const displayItems = allmonsters
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((item, key) => {
            return (
                <div className="item zcard" key={key} onClick={(e) => showMonster(item.id)}>
                    <div className='back'>
                        <span>{item.name}</span>
                    </div>
                    <div className='front'>
                        <img src={item.photo} alt="" />
                    </div>
                </div>
            );
        });

    const pageCount = Math.ceil(allmonsters.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        getAllmonsters();
    }, []);

    const getAllmonsters = async (tofileter = false, keywords = "") => {
        setLoader(true);
        let response = await fetchGet("https://pokeapi.co/api/v2/pokemon?limit=100");
        let tab = response["results"];
        let tab2;
        dispatch(emptyMonsters());
        for (let entry of tab) {
            tab2 = entry["url"].split("/");
            entry["photo"] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${tab2[6]}.png`;
            entry["id"] = parseInt(tab2[6]);
            //setAllmonsters(allmonsters => [...allmonsters, entry]);
            if (tofileter === false || keywords === "") dispatch(addMonster(entry));
            else {

                if (!isNaN(keywords)) {//if it is a number
                    if (entry["id"] === parseInt(keywords)) {
                        dispatch(addMonster(entry));
                        break;
                    }
                } else {
                    if (entry["name"].toLowerCase().includes(keywords.toLowerCase())) dispatch(addMonster(entry));
                }
            }
        }
        await wait(0.5);
        setLoader(false);
        //non réussi
        //if (tofileter === true && allmonsters.length === 0) alert("Aucun monstre n'a été trouvé");
    }

    const formik = useFormik({
        initialValues: {
            keywords: ""
        },
        onSubmit: values => {
            getAllmonsters(true, values.keywords);
        },
    });

    const showMonster = (id) => {
        navigate(`/monstre/${id}`);
    }

    return (
        <div id="home">
            <h1>{allmonsters.length} monstres</h1>
            <div className='container-fluid mb-4'>
                <form className="row" onSubmit={formik.handleSubmit}>
                    <div className="col-8 col-md-4">
                        <input type="text" className="form-control form-control-sm" id="keywords" name="keywords" placeholder="nom ou numéro" onKeyUp={formik.handleChange} value={formik.values.firstName} />
                    </div>
                    <div className="col-4 col-md-2">
                        <button type="submit" className='btn btn-primary btn-sm'>Submit</button>
                    </div>
                </form>
            </div>
            <div id='list-items'>
                {displayItems}
            </div>

            {allmonsters.length > 0 &&
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
            }

            {loader === true &&
                <div className="wrap-loader">
                    <Blocks
                        visible={true}
                        height="120"
                        width="120"
                        ariaLabel="blocks-loading"
                    />
                </div>
            }
        </div >
    );
}

export default Home;