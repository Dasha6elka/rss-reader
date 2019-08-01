function transformChannelToCamelCase(channel, activeChannel) {
  return {
    id: channel.id,
    title: channel.title,
    rssUrl: channel.rss_url,
    logoUrl: channel.logo_url,
    categoryId: channel.id_category,
    editable: false,
    active: channel.id === activeChannel
  };
}

export default transformChannelToCamelCase;
