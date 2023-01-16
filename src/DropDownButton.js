import React from 'react';


class DropDownButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openDropdown: false
        }
    }

    handleClick() {
        this.setState({ openDropdown: !this.state.openDropdown });
    }

    render() {
        return (
            <div className="drop_down_button" onClick={() => this.handleClick() }>
                <div className="value_wrapper">
                    {this.props.value}
                </div>
                {this.state.openDropdown &&
                    <div className="drop_down_container">
                        {
                            this.props.permittedValuesList.map((value) => {
                                return <div className={value === this.props.value?'drop_down_element selected':'drop_down_element'} >
                                    {value}
                                </div>
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}

export default DropDownButton;