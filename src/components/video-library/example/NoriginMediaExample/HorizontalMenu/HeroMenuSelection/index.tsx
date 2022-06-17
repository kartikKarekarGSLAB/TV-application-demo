import styled from 'styled-components';

const SelectedItemWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SelectedItemBox = styled.div`
    height: 282px;
    width: 1074px;
    background-color: ${({ color }) => color};
    margin-bottom: 37px;
    border-radius: 7px;
`;

const SelectedItemTitle = styled.div`
    position: relative;
    bottom: 75px;
    left: 100px;
    color: white;
    font-size: 27px;
    font-weight: 400;
    font-family: 'Segoe UI';
`;

interface selectedAssetProps {
    color: string;
    title: string;
}

function HeroMenuSelection({ color, title }: selectedAssetProps) {
    return (
        <SelectedItemWrapper>
            <SelectedItemBox color={color} />
            <SelectedItemTitle>{title}</SelectedItemTitle>
        </SelectedItemWrapper>
    );
}

export { HeroMenuSelection };
