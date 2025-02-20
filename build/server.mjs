// src/server.ts
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";

// src/routes/access-invite-link-route.ts
import { z as z2 } from "zod";

// src/redis/client.ts
import { Redis } from "ioredis";

// src/settings/env.ts
import { z } from "zod";
var envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  WEB_URL: z.string().url()
});
var env = envSchema.parse(process.env);

// src/redis/client.ts
var redis = new Redis(env.REDIS_URL);

// src/functions/access-invite-link.ts
async function accessInviteLink({
  subscriberId
}) {
  await redis.hincrby("referral:access-count", subscriberId, 1);
}

// src/routes/access-invite-link-route.ts
var accessInviteLinkRoute = async (app2) => {
  app2.get(
    "/invites/:subscriberId",
    {
      schema: {
        summary: "Access invite link and redirect user",
        tags: ["Referral"],
        params: z2.object({
          subscriberId: z2.string()
        }),
        response: {
          [302 /* MOVED_TEMPORARILY */]: z2.null(),
          [400 /* BAD_REQUEST */]: z2.object({
            message: z2.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { subscriberId } = request.params;
      await accessInviteLink({ subscriberId });
      const redirectUrl = new URL(env.WEB_URL);
      redirectUrl.searchParams.set("referrer", subscriberId);
      return reply.redirect(
        redirectUrl.toString(),
        302 /* MOVED_TEMPORARILY */
      );
    }
  );
};

// src/routes/get-ranking-route.ts
import { z as z3 } from "zod";

// src/functions/get-ranking.ts
import { inArray } from "drizzle-orm";

// src/drizzle/client.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// src/drizzle/schema/subscriptions.ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
var subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

// src/drizzle/client.ts
var pg = postgres(env.POSTGRES_URL);
var db = drizzle(pg, {
  schema: {
    subscriptions
  }
});

// src/functions/get-ranking.ts
async function getRanking() {
  const ranking = await redis.zrevrange("referral:ranking", 0, 2, "WITHSCORES");
  const subscriberMap = {};
  for (let i = 0; i < ranking.length; i += 2) {
    subscriberMap[ranking[i]] = Number.parseInt(ranking[i + 1]);
  }
  const subscribers = await db.select().from(subscriptions).where(inArray(subscriptions.id, Object.keys(subscriberMap)));
  const rankingWithScore = subscribers.map((subscriber) => {
    return {
      id: subscriber.id,
      name: subscriber.name,
      score: subscriberMap[subscriber.id]
    };
  }).sort((sub1, sub2) => sub2.score - sub1.score);
  return { rankingWithScore };
}

// src/routes/get-ranking-route.ts
var getRankingRoute = async (app2) => {
  app2.get(
    "/ranking",
    {
      schema: {
        summary: "Get ranking",
        tags: ["Referral"],
        response: {
          [200 /* OK */]: z3.object({
            ranking: z3.array(
              z3.object({
                id: z3.string(),
                name: z3.string(),
                score: z3.number()
              })
            )
          })
        }
      }
    },
    async (request) => {
      const { rankingWithScore } = await getRanking();
      return { ranking: rankingWithScore };
    }
  );
};

// src/routes/get-subscriber-invite-clicks-route.ts
import { z as z4 } from "zod";

// src/functions/get-subscriber-invite-clicks.ts
async function getSubscriberInviteClicks({
  subscriberId
}) {
  const count = await redis.hget("referral:access-count", subscriberId);
  return {
    count: count ? Number.parseInt(count) : 0
  };
}

// src/routes/get-subscriber-invite-clicks-route.ts
var getSubscriberInviteClicksRoute = async (app2) => {
  app2.get(
    "/subscribers/:subscriberId/ranking/clicks",
    {
      schema: {
        summary: "Get the number of clicks on the subscriber invite link",
        tags: ["Referral"],
        params: z4.object({
          subscriberId: z4.string()
        }),
        response: {
          [200 /* OK */]: z4.object({
            count: z4.number()
          })
        }
      }
    },
    async (request) => {
      const { subscriberId } = request.params;
      const { count } = await getSubscriberInviteClicks({ subscriberId });
      return { count };
    }
  );
};

// src/routes/get-subscriber-invites-count-route.ts
import { z as z5 } from "zod";

// src/functions/get-subscriber-invites-count.ts
async function getSubscriberInvitesCount({
  subscriberId
}) {
  const count = await redis.zscore("referral:ranking", subscriberId);
  return {
    count: count ? Number.parseInt(count) : 0
  };
}

// src/routes/get-subscriber-invites-count-route.ts
var getSubscriberInvitesCountRoute = async (app2) => {
  app2.get(
    "/subscribers/:subscriberId/ranking/count",
    {
      schema: {
        summary: "Get subscriber invites count",
        tags: ["Referral"],
        params: z5.object({
          subscriberId: z5.string()
        }),
        response: {
          [200 /* OK */]: z5.object({
            count: z5.number()
          })
        }
      }
    },
    async (request) => {
      const { subscriberId } = request.params;
      const { count } = await getSubscriberInvitesCount({ subscriberId });
      return { count };
    }
  );
};

// src/routes/get-subscriber-ranking-position-route.ts
import { z as z6 } from "zod";

// src/functions/get-subscriber-ranking-position.ts
async function getSubscriberRankingPosition({
  subscriberId
}) {
  const rank = await redis.zrevrank("referral:ranking", subscriberId);
  if (rank === null) {
    return { position: null };
  }
  return {
    position: rank + 1
  };
}

// src/routes/get-subscriber-ranking-position-route.ts
var getSubscriberRankingPositionRoute = async (app2) => {
  app2.get(
    "/subscribers/:subscriberId/ranking/position",
    {
      schema: {
        summary: "Get subscriber ranking position",
        tags: ["Referral"],
        params: z6.object({
          subscriberId: z6.string()
        }),
        response: {
          [200 /* OK */]: z6.object({
            position: z6.number().nullable()
          })
        }
      }
    },
    async (request) => {
      const { subscriberId } = request.params;
      const { position } = await getSubscriberRankingPosition({
        subscriberId
      });
      return { position };
    }
  );
};

// src/routes/subscribe-to-item-route.ts
import z7 from "zod";

// src/functions/subscribe-to-event.ts
import { eq } from "drizzle-orm";
async function subscribeToEvent({
  name,
  email,
  referrerId
}) {
  const subscribers = await db.select().from(subscriptions).where(eq(subscriptions.email, email));
  if (subscribers.length > 0) {
    return {
      subscriberId: subscribers[0].id
    };
  }
  const result = await db.insert(subscriptions).values({
    name,
    email
  }).returning();
  if (referrerId) {
    await redis.zincrby("referral:ranking", 1, referrerId);
  }
  const subscriber = result[0];
  return {
    subscriberId: subscriber.id
  };
}

// src/routes/subscribe-to-item-route.ts
var subscribeToItemRoute = async (app2) => {
  app2.post(
    "/subscriptions",
    {
      schema: {
        summary: "Subscribe someone to the event",
        tags: ["Subscription"],
        body: z7.object({
          name: z7.string(),
          email: z7.string().email(),
          referrer: z7.string().nullable()
        }),
        response: {
          [201 /* CREATED */]: z7.object({
            subscriberId: z7.string()
          }),
          [400 /* BAD_REQUEST */]: z7.object({
            message: z7.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { name, email, referrer } = request.body;
      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId: referrer
      });
      return reply.status(201 /* CREATED */).send({ subscriberId });
    }
  );
};

// src/server.ts
var app = fastify().withTypeProvider();
app.register(fastifyCors, {
  origin: "http://localhost:3333"
});
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "NLW Connect",
      version: "0.0.1"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.register(subscribeToItemRoute);
app.register(accessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInvitesCountRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(getRankingRoute);
app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP server running on port ${env.PORT}`);
});
