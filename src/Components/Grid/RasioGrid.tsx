import { Grid, GridProps } from "@mantine/core";
import { JSX } from "react";

interface RasioGridType extends GridProps {
    children: JSX.Element;
}

const RasioGrid = ({children, ...props}: RasioGridType) => {
    return (
        <div style={{ resize: 'horizontal', overflow: 'hidden', maxWidth: '100%' }}>
            <Grid
            {...props}
            type="container"
            >
                {children}
            </Grid>

            
        </div>
    );
}

export default RasioGrid;