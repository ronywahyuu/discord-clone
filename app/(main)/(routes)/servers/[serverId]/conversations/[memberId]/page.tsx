import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import { getOrCreateConversation } from "@/lib/conversation";
import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
}
const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation || {};

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full ">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        serverId={params.serverId}
        name={otherMember.profile.name}
        type="conversation"
      />
      <div className="h-full">
        Future Mesage
      </div>
      <ChatInput
        name={otherMember.profile.name}
        type="conversation"
        query={{ conversationId: conversation.id }}
        // apiUrl={`/api/conversations/${conversation.id}/messages`}
        apiUrl={`/api/socket/direct-messages`}
      />
    </div>
  );
};

export default MemberIdPage;
