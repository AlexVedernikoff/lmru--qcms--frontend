import {useEffect, useRef, useState} from 'react';
import {Grid, RegularButton} from 'fronton-react';
import {ChevronDownIcon, DownloadIcon} from '@fronton/icons-react';
import {downloadFile} from 'api/downloadQualityDocument';
import {TFunction} from 'i18next';

interface IProps {
    arr: number[];
    sliceBeforePointers: number;
    t: TFunction<'models', undefined, 'models'>;
}

const ShowMoreDocsComponent: React.FC<IProps> = ({arr, sliceBeforePointers, t}) => {
    const ellipsisRef = useRef<HTMLDivElement>(null);
    const [showAllValues, setShowAllValues] = useState(false);

    useEffect(() => {
        const handleMouseEnter = () => setShowAllValues(true);
        const handleMouseLeave = () => setShowAllValues(false);

        const ellipsisElement = ellipsisRef.current;

        if (ellipsisElement) {
            ellipsisElement.addEventListener('mouseenter', handleMouseEnter);
            ellipsisElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (ellipsisElement) {
                ellipsisElement.removeEventListener('mouseenter', handleMouseEnter);
                ellipsisElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <div>
            {arr.slice(0, sliceBeforePointers).map((id, index) => (
                <Grid key={index} columns="auto auto auto" justifyContent="space-between" alignItems="center">
                    <RegularButton iconRight={<DownloadIcon />} onClick={() => downloadFile(id)} variant="pseudo" />
                    <div>id:</div>
                    <div>{id}</div>
                </Grid>
            ))}

            <div ref={ellipsisRef}>
                {!showAllValues && arr.length > sliceBeforePointers && (
                    <Grid justifyContent="center" style={{paddingTop: '3px'}}>
                        <Grid columnGap={4} alignItems="end" columns="auto auto" style={{fontSize: '12px'}}>
                            <div>{t('ModelDetails.MasterPlan.Table.ShowMore')}</div>
                            <ChevronDownIcon size="s" />{' '}
                        </Grid>
                    </Grid>
                )}
                {showAllValues &&
                    arr.slice(sliceBeforePointers).map((id, index) => (
                        <Grid
                            key={index + sliceBeforePointers}
                            columns="auto auto auto"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <RegularButton
                                iconRight={<DownloadIcon />}
                                onClick={() => downloadFile(id)}
                                variant="pseudo"
                            />
                            <div>id:</div>
                            <div>{id}</div>
                        </Grid>
                    ))}
            </div>
        </div>
    );
};

export default ShowMoreDocsComponent;
