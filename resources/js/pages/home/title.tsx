import React from 'react';

interface TitleProps {
    title: string;
    desc: string;
}

function Title({ title, desc }: TitleProps) {
    return (
        <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold">{title}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{desc}</p>
        </div>
    );
}

export default Title;
