import React, { Component } from 'react';

class SortComponent extends Component {
    state = {
        sort_by: ''
    }


    render() {
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
           console.log(this.props.propsTopic, "sort");
           console.log(this.state.sort_by, "sort")
            this.props.SortedArticles(this.props.propsTopic, this.state.sort_by)
        }
    }

}

export default SortComponent;