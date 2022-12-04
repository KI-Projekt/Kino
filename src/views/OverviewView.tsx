import * as React from 'react';
import TileBar from '../components/OverviewView/Tilebar';

function OverviewView() {


    return (
        <div>
            <TileBar title='Star Wars' query='Star Wars' />
            <TileBar title='Marvel' query='Marvel' />
            <TileBar title='Harry Potter' query='Harry Potter' />
        </div>
    );
}


export default OverviewView;


