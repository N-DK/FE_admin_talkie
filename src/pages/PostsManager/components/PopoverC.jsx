import { Menu, Popover } from 'antd';
import { useState } from 'react';

function PopoverC({ children, title, content, trigger, placement }) {
    const [open, setOpen] = useState(false);

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const handleMenuClick = (e) => {
        console.log(e);
        hide();
    };

    return (
        <Popover
            className="border-none"
            title={title}
            content={<Menu onClick={handleMenuClick}>{content}</Menu>}
            trigger={trigger}
            placement={placement}
            open={open}
            onOpenChange={handleOpenChange}
        >
            {children}
        </Popover>
    );
}

export default PopoverC;
