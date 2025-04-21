import React from 'react'
import { Separator } from './ui/separator'
import { Github, LucideCalendarDays, Twitter } from 'lucide-react' // Using lucide-react for consistent icons
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className='flex justify-center h-16 border-t px-6 bg-background sticky bottom-0'>
            <div className='container flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <LucideCalendarDays className='size-6 stroke-[1.5px]' />
                    <Separator orientation="vertical" className="h-6" />
                    <p className='text-sm text-muted-foreground font-normal'>
                        Built with <span className='text-red-500'>❤️</span> by <Link to={"https://github.com/rxhul18"} className='underline font-semibold'>Rahul Shah</Link>
                    </p>
                </div>

                <div className='flex items-center gap-2'>
                    <a
                        href="https://github.com/rxhul18/InterviewScheduler"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-muted-foreground hover:text-foreground transition-colors border p-1 rounded-lg'
                    >
                        <Github className='size-5' />
                    </a>
                    <a
                        href="https://x.com/mindpuzzledev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-muted-foreground hover:text-foreground transition-colors border p-1 rounded-lg'
                    >
                        <Twitter className='size-5' />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer