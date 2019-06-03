import React, {Component} from 'react';
import axios from "axios";

import SideDrawer from "./SideDrawer/SideDrawer";
import ShoppingList from "../../containers/ShoppingList/ShoppingList"
import Footer from "./Footer/Footer";
import Filter from "../../components/Filter/Filter";

class Layout extends Component {
    state = {
        //all shop
        shoppingList: null,
        //all categories
        categories: null,
        //search by name
        searchedValue: '',
        //search by category
        searchedCategory: []
    };

    componentDidMount() {
        axios.get('https://demo8421975.mockable.io/products')
            .then(list => {
                this.setState({shoppingList: list.data.products});
                let newCategories = [...new Set(list.data.products.map(p => p.bsr_category))];
                this.setState(
                    {
                        categories: newCategories,
                    });
            })
            .catch(error => console.log(error));
    }

    handleFilterSearch = (event) => {
        this.setState({searchedValue: event.target.value});
    };
    handleCategories = (category) => {
        let newFilteredByCategories = [...this.state.searchedCategory];
        newFilteredByCategories[0] = category;
        this.setState({searchedCategory: newFilteredByCategories});
    };

    filterItems = (item) => {
        return item.name.toLowerCase().includes(this.state.searchedValue)
            && this.state.searchedCategory.includes(item.bsr_category);
    };

    render() {
        const {categories, shoppingList, searchedValue} = this.state;
        return (
            <div className="position-relative" style={{minHeight:'100vh'}}>
                <div className="row" style={{padding:'2.5rem'}}>
                    <Filter
                        handleFilterSearch={this.handleFilterSearch}
                        searchedValue={searchedValue}
                    />
                    <div className="col-12  col-md-3">
                        {categories && categories.map(category => <SideDrawer
                            key={category} {...{category}}
                            handleCategories={this.handleCategories}
                        />)}
                    </div>
                    <ShoppingList {...{shoppingList}} {...{categories}} filterItems={this.filterItems}/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Layout;