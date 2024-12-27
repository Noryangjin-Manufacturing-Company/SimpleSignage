import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import Panels, { Panel } from '@enact/moonstone/Panels';
import React from 'react';

import MainPanel from '../views/MainPanel/MainPanel';
import Calendar from '../views/Calendar/Calendar';

class AppBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: 'main'
        };
    }

    handleNavigate = (ev) => {
        console.log('Setting path to:', ev.path);
        this.setState({
            path: ev.path
        });
    }

    render() {
        const { path } = this.state;
        
        return (
            <div>
                <Panels>
                    {path === 'main' ? (
                        <MainPanel onNavigate={this.handleNavigate} />
                    ) : (
                        <Panel>
                            <Calendar />
                        </Panel>
                    )}
                </Panels>
            </div>
        );
    }
}

export default MoonstoneDecorator(AppBase);
