import { accessInviteLinkRoute } from './access-invite-link-route'
import { getRankingRoute } from './get-ranking-route'
import { getSubscriberInviteClicksRoute } from './get-subscriber-invite-clicks-route'
import { getSubscriberInvitesCountRoute } from './get-subscriber-invites-count-route'
import { getSubscriberRankingPositionRoute } from './get-subscriber-ranking-position-route'
import { subscribeToItemRoute } from './subscribe-to-item-route'

export const routes = [
  subscribeToItemRoute,
  accessInviteLinkRoute,
  getSubscriberInviteClicksRoute,
  getSubscriberInvitesCountRoute,
  getSubscriberRankingPositionRoute,
  getRankingRoute,
]
