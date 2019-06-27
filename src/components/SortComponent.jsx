import React, { Component } from 'react';
import { Error } from './Error'

class SortComponent extends Component {
    state = {
        sort_by: '',
        err: null
    }


    render() {
        const { err } = this.state;
        if (err !== null) {
            return <Error err={err} />
        }
        return (
            <div>
                <select id="select-sort" onChange={this.updateSortState}>
                    <option value="created_at" >Created At</option>
                    <option value="votes" >Votes</option>
                    <option value="comment_count" >Comment Count</option>
                </select>
            </div>


        )
    }

    updateSortState = (event) => {
        this.setState({ sort_by: event.target.value })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.sort_by !== prevState.sort_by) {
            this.props.SortedArticles(this.props.propsTopic, this.state.sort_by)
        }
    }

}

export default SortComponent;