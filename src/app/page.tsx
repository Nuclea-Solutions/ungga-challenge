'use client';

// components
import HomeLayout from '@/components/HomeLayout';
import EmptyCardsContainerComponent from '@/stories/empty_cards_container/EmptyCardsContainer.component';
import HelpButtonComponent from '@/stories/help_button/HelpButton.component';
import MessagesList from '@/components/MessagesList';
import InputWidthButtonComponent from '@/stories/input_with_button/InputWidthButton.component';
// hooks
import useChatCustom from '@/hooks/useChatCustom/useChatCustom';
// store
import useMessagesStore from '@/store/useMessagesStore';

/*
Page with chat using the message and the input component that it's return from response
*/
export default function Chat() {
	const { isLoading, input, handleInputChange, handleSubmit } = useChatCustom();
	const messages = useMessagesStore((state) => state.messages);

	return (
		<HomeLayout>
			<div className='flex flex-col justify-between w-full h-full'>
				{/* MESSAGES */}
				<MessagesList messages={messages} />
				{isLoading && <p className='px-10'>cargando...</p>}

				<div className='h-full pt-2 text-center text-xs text-gray-600 dark:text-gray-300 md:px-[60px] flex flex-col justify-end relative'>
					{/* Empty chat cards */}
					{messages?.every((item) => item.role === 'system') && (
						<div className='relative w-full h-full'>
							<EmptyCardsContainerComponent isNewChat />
						</div>
					)}
					{/* Input component */}
					<div className='sticky bottom-0 flex justify-center w-full py-2 text-xs text-center text-gray-600 dark:text-gray-300'>
						{/* Input component */}
						<div className='flex flex-row-reverse items-center w-full px-2  md:block'>
							<form
								onSubmit={handleSubmit}
								className='w-full lg:mx-auto lg:max-w-2xl xl:max-w-3xl bg-white dark:bg-[#444654] rounded-large relative'
							>
								<InputWidthButtonComponent value={input} onChange={handleInputChange} />

								{/* Footer */}
								<div className='mt-2 text-sm text-center'>
									<span>ChatGPT can make mistakes. Consider checking important information.</span>
								</div>
								<div className='absolute z-10 bottom-2 -right-10 xl:-right-20'>
									<HelpButtonComponent />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</HomeLayout>
	);
}
