// MainPanel.js
import Button from '@enact/moonstone/Button';
import kind from '@enact/core/kind';
import { Panel, Header } from '@enact/moonstone/Panels';

const MainPanel = kind({
    name: 'MainPanel',

    handlers: {
        onShowCalendar: (ev, {onNavigate}) => {
            console.log('Button clicked, navigating to calendar');
            onNavigate && onNavigate({path: 'calendar'});
        }
    },

    render: ({onShowCalendar, ...rest}) => (
        <Panel {...rest}>
            <Header title="Calendar App" />
            <div>
                <Button onClick={onShowCalendar}>
                    달력 보기
                </Button>
            </div>
        </Panel>
    )
});

export default MainPanel;