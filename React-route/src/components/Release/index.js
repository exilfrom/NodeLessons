/**
 * Created by Odin on 21.12.2016.
 */
import React, { Component } from 'react'
export default class Release extends Component {
    render() {
        {/* замени все '-' в параметре (то есть в адресе) на пробелы */}
        const releaseName = this.props.params.release.replace(/-/g,' ');
        return (
            <div className='col-md-12'>
                {releaseName}
            </div>
        )
    }
}