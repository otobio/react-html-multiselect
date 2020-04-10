import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.topNode = React.createRef();

        const value = [];
        if (props.value && props.options) {
            props.options.forEach((opt) => {
                props.value.forEach((opt2) => {
                    if (opt2.value === opt.value) {
                        value.push(opt);
                    }
                });
            });
        }

        this.state = {
            selected: value,
            isOpen: false,
        };

        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener("click", this.handleDocumentClick, false);
    }

    componentWillUpdate(_newProps, newState) {
        if (newState.selected !== this.state.selected && this.props.onChange) {
            this.props.onChange(newState.selected);
        }
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleDocumentClick, false);
    }

    handleMouseDown(event) {
        if (event.type === "mousedown" && event.button !== 0) return;
        event.stopPropagation();
        event.preventDefault();

        this.filterOptions("");
        this.setState((pState) => ({
            isOpen: !pState.isOpen,
        }));
    }

    setValue(option) {
        const { selected } = this.state;
        const optionIndex = selected.indexOf(option);

        if (
            option.disabled
            || (selected.length >= this.props.maxSelectLength && optionIndex === -1)) {
            return;
        }

        const newState = {
            selected: optionIndex === -1
                ? selected.concat(option)
                : selected.slice(0, optionIndex).concat(selected.slice(optionIndex + 1)),
        };
        this.setState(newState);
    }

    filterOptions(query) {
        if (this.props.withSearch) {
            this.props.options.forEach((o, i) => {
                this.props.options[i].hidden = o.value.toLowerCase()
                    .indexOf(query.toLowerCase()) === -1;
            });
            this.forceUpdate();
        }
    }

    renderSearch() {
        return this.props.withSearch ? (
            <input
                type="text"
                tabIndex="-1"
                placeholder="Filter .."
                onChange={(e) => this.filterOptions(e.target.value)}
            />
        ) : null;
    }

    renderOption(option) {
        const selected = this.state.selected.indexOf(option) !== -1;
        const optionClass = classNames({
            "Dropdown-option": true,
            selected,
            disabled: Boolean(option.disabled),
            hidden: Boolean(option.hidden),
        });

        return (
            <div
                role="option"
                aria-selected={selected}
                key={option.value}
                className={optionClass}
                onClick={this.setValue.bind(this, option)}
                onKeyDown={this.setValue.bind(this, option)}
                tabIndex="0"
            >
                {option.label}
            </div>
        );
    }

    buildMenu() {
        const ops = this.props.options.map((option) => {
            if (option.type === "group") {
                const groupTitle = (<div className="title">{option.name}</div>);
                const options = option.items.map((item) => this.renderOption(item));

                return (
                    <div className="group" key={option.name}>
                        {groupTitle}
                        {options}
                    </div>
                );
            }
            return this.renderOption(option);
        });

        return ops.length ? ops : <div className="Dropdown-noresults">No options found</div>;
    }

    renderHtmlOptions() {
        return this.props.options.map((option) => (
            <option
                key={option.value}
                value={option.value}
                selected={this.state.selected.indexOf(option) > -1}
                disabled={Boolean(option.disabled)}
            >
                {option.label}
            </option>
        ));
    }

    handleDocumentClick(event) {
        if (!this.topNode.current.contains(event.target)) {
            this.setState({ isOpen: false });
        }
    }

    render() {
        const {
            className, controlClassName, menuClassName, placeholder, noPreview,
        } = this.props;
        const { selected, isOpen } = this.state;
        const value = selected.map((option) => option.label).join(", ");
        const menu = isOpen ? (
            <div className={menuClassName}>
                {this.renderSearch()}
                {this.buildMenu()}
            </div>
        ) : null;

        const dropdownClass = classNames({
            Dropdown: true,
            "is-open": isOpen,
        }, className);

        return (
            <div ref={this.topNode} className={dropdownClass}>
                <select
                    multiple
                    name={this.props.name}
                    className="invisible-element"
                >
                    {this.renderHtmlOptions()}
                </select>
                <div role="listbox" tabIndex="0" className={controlClassName} onMouseDown={this.handleMouseDown.bind(this)} onTouchEnd={this.handleMouseDown.bind(this)}>
                    {(!noPreview && value) || (noPreview && selected.length && `${selected.length} Selected`) || placeholder}
                    <span className="Dropdown-arrow" />
                </div>
                {menu}
            </div>
        );
    }
}

Dropdown.propTypes = {
    name: PropTypes.string,
    value: PropTypes.array,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    controlClassName: PropTypes.string,
    menuClassName: PropTypes.string,
    className: PropTypes.string,
    maxSelectLength: PropTypes.number,
    noPreview: PropTypes.bool,
    withSearch: PropTypes.bool,
};

Dropdown.defaultProps = {
    controlClassName: "Dropdown-control",
    menuClassName: "Dropdown-menu",
    onChange: () => {},
    placeholder: "Select",
    maxSelectLength: Infinity,
    withSearch: true,
};

export default Dropdown;
