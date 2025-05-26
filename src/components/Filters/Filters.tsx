import {ChangeEvent} from "react";
import {SelectForFilter} from "../SelectForFilter/SelectForFilter.tsx";

export type Filter = {
    topic: string
    section: string
}

type Props = {
    filters: Filter
    handleFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void
    setFilters: (filt: Filter) => void
    topics: string[]
    sections: string[]
};

export const Filters = (
    {
        filters,
        handleFilterChange,
        setFilters,
        topics,
        sections
    }: Props) => {

    return (
        <>
            <div>Фильтры</div>
            <div className="filters">
                <SelectForFilter
                    selectName={"topic"}
                    value={filters.topic}
                    handleChange={handleFilterChange}
                    options={topics}
                />

                <SelectForFilter
                    selectName={"section"}
                    value={filters.section}
                    handleChange={handleFilterChange}
                    options={sections}
                    disabled={!filters.topic}
                />

                <button
                    onClick={() => setFilters({topic: '', section: ''})}
                    disabled={!filters.topic && !filters.section}
                >
                    Clear Filters
                </button>
            </div>
        </>
    );
};