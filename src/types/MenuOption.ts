export default interface MenuOption {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string;
        titleId?: string;
        desc?: string;
        descId?: string;
    }>
    label: string; 
    route: string; 
}