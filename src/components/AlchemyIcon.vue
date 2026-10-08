<script setup lang="ts">
defineProps<{
  name: string
  size?: number | string
  color?: string
}>()
</script>

<template>
  <svg
    class="alchemy-icon"
    :width="size || 20"
    :height="size || 20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    :style="color ? { color } : {}"
  >
    <!-- Золотая чеканная монета -->
    <g v-if="name === 'coin'">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="6" stroke-dasharray="2 2" />
      <path d="M12 8.5v7M9.5 10.5h5" />
    </g>

    <!-- Сырьё -->
    <g v-else-if="name === 'red_root' || name === 'root'">
      <path d="M12 2v7" />
      <path d="M8 8c1.5 2 2.5 5 2 9-1 2-2 3-2 3" />
      <path d="M16 8c-1.5 2-2.5 5-2 9 1 2 2 3 2 3" />
      <path d="M12 9c-2 3-3 7-2 11" />
      <path d="M10 4l-3 2" />
      <path d="M14 4l3 2" />
    </g>

    <g v-else-if="name === 'moon_mushroom' || name === 'mushroom'">
      <path d="M12 11v10" />
      <path d="M8 21h8" />
      <path d="M4 11c0-5 3.5-8 8-8s8 3 8 8c0 1-2 2-8 2s-8-1-8-2z" />
      <circle cx="9" cy="8" r="1" fill="currentColor" />
      <circle cx="15" cy="7" r="1.5" fill="currentColor" />
    </g>

    <g v-else-if="name === 'fairy_dust' || name === 'dust'">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
      <path d="M18 14l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
      <path d="M6 14l.8 1.8 1.8.8-1.8.8L6 20l-.8-1.8L3.4 17.4l1.8-.8z" />
    </g>

    <g v-else-if="name === 'frost_lotus' || name === 'lotus'">
      <path d="M12 3v18M3 12h18" stroke-dasharray="1 1" opacity="0.6" />
      <path d="M12 3c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10z" />
      <path d="M6 15c-1-3 0-6 3-8" />
      <path d="M18 15c1-3 0-6-3-8" />
      <path d="M8 18c2 2 6 2 8 0" />
    </g>

    <g v-else-if="name === 'phoenix_feather' || name === 'feather'">
      <path d="M20.24 3.76a6 6 0 0 0-8.49 0L3.5 12a4 4 0 0 0 0 5.66l2.83 2.83a4 4 0 0 0 5.66 0l8.25-8.24a6 6 0 0 0 0-8.49z" />
      <path d="M16 8l-8.5 8.5" />
      <path d="M13 5l2 2" />
      <path d="M10 8l2 2" />
      <path d="M7 11l2 2" />
    </g>

    <g v-else-if="name === 'shadow_herb' || name === 'shadow'">
      <path d="M12 2a9 9 0 0 0 0 18 9 9 0 0 0 6-2.5A8 8 0 0 1 12 4c0-.7.1-1.3.3-2" />
      <path d="M12 12c1.5-2 3.5-3 6-3" />
      <path d="M14 15c1.5-1 3-1.5 5-1" />
    </g>

    <g v-else-if="name === 'dragon_tear' || name === 'tear'">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <path d="M12 8v5" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </g>

    <g v-else-if="name === 'sun_amber' || name === 'amber'">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
      <path d="M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
    </g>

    <!-- Зелья -->
    <g v-else-if="name === 'health_potion' || name === 'potion_health'">
      <path d="M9 3h6M10 3v3a4 4 0 0 1-1 3l-3 4.5A4 4 0 0 0 9 20h6a4 4 0 0 0 3-6.5L15 9a4 4 0 0 1-1-3V3" />
      <path d="M10 14h4M12 12v4" />
    </g>

    <g v-else-if="name === 'mana_potion' || name === 'potion_mana'">
      <path d="M10 2h4M11 2v3l-4 7a4 4 0 0 0 3.5 6h3a4 4 0 0 0 3.5-6l-4-7V2" />
      <path d="M12 12l1 2 2 .5-1.5 1.5.5 2-2-1-2 1 .5-2L9.5 14.5l2-.5z" />
    </g>

    <g v-else-if="name === 'frost_brew' || name === 'potion_frost'">
      <path d="M9 2h6M10 2v4l-4 6a4 4 0 0 0 3.3 6h7.4a4 4 0 0 0 3.3-6l-4-6V2" />
      <path d="M12 10v6M9 13h6M10 11l4 4M14 11l-4 4" />
    </g>

    <g v-else-if="name === 'strength_potion' || name === 'potion_strength'">
      <path d="M8 3h8M10 3v3l-5 5a4 4 0 0 0 2.8 6.8h8.4A4 4 0 0 0 19 11l-5-5V3" />
      <path d="M13 10l-3 4h3l-1 4" />
    </g>

    <g v-else-if="name === 'shadow_elixir' || name === 'potion_shadow'">
      <path d="M9 3h6M10 3v3c0 2-2 4-2 7a5 5 0 0 0 10 0c0-3-2-5-2-7V3" />
      <path d="M12 11a3 3 0 0 0 0 6 3 3 0 0 0 2-1 2.5 2.5 0 0 1-2-5z" />
    </g>

    <g v-else-if="name === 'phoenix_brew' || name === 'potion_phoenix'">
      <path d="M9 3h6M10 3v3l-4 5a4 4 0 0 0 2 6.5h8a4 4 0 0 0 2-6.5l-4-5V3" />
      <path d="M12 11c1.5 1.5 2 3 1 4.5-1 1.5-2.5 1-2.5 1s.5-1 0-2c-.5-1-1.5-1.5-1-2.5.5-1 2.5-1 2.5-1z" />
    </g>

    <g v-else-if="name === 'solar_draught' || name === 'potion_solar'">
      <path d="M9 2h6M10 2v4c-2 2-3 4-3 7a6 6 0 0 0 12 0c0-3-1-5-3-7V2" />
      <circle cx="12" cy="14" r="2.5" />
      <path d="M12 9.5v1M12 17.5v1M7.5 14h1M15.5 14h1" />
    </g>

    <!-- Системные иконки интерфейса -->
    <g v-else-if="name === 'cauldron'">
      <path d="M4 9h16" />
      <path d="M5 9c0 6 3 10 7 10s7-4 7-10" />
      <path d="M8 19l-2 3M16 19l2 3" />
      <path d="M7 6c1 1 1 2 0 3M12 5c1 1 1 2 0 3M17 6c1 1 1 2 0 3" />
    </g>

    <g v-else-if="name === 'grimoire' || name === 'book'">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M10 7l2 2 4-4" />
    </g>

    <g v-else-if="name === 'pantry' || name === 'box'">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </g>

    <g v-else-if="name === 'market' || name === 'shop'">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </g>

    <g v-else-if="name === 'counter' || name === 'users'">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </g>

    <!-- Персонажи / Архетипы -->
    <g v-else-if="name === 'scout' || name === 'bow' || name === 'Эльфийский следопыт'">
      <path d="M19 5l-7 7M19 5l-4 12-3-5-5-3 12-4z" />
      <path d="M5 19l4-4" />
    </g>

    <g v-else-if="name === 'guard' || name === 'shield' || name === 'Гвардеец короля'">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v8M8 12h8" />
    </g>

    <g v-else-if="name === 'mage' || name === 'orb' || name === 'Странствующий маг'">
      <circle cx="12" cy="12" r="7" />
      <path d="M12 5a7 7 0 0 0-4 6M12 19a7 7 0 0 0 4-6" />
      <path d="M8 21l8-18" stroke-dasharray="2 2" opacity="0.6" />
    </g>

    <g v-else-if="name === 'blacksmith' || name === 'hammer' || name === 'Дворфийский кузнец'">
      <path d="M15 12l-8.5 8.5a2.12 2.12 0 0 1-3-3L12 9" />
      <path d="M17.64 4.36a3 3 0 0 0-4.24 0L12 5.76l6.24 6.24 1.4-1.4a3 3 0 0 0 0-4.24z" />
    </g>

    <g v-else-if="name === 'hunter' || name === 'sword' || name === 'Охотница на чудовищ'">
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <path d="M13 19l2 2 4-4-2-2" />
      <path d="M19 15l2 2" />
    </g>

    <g v-else-if="name === 'archmage' || name === 'staff' || name === 'Архимаг башни'">
      <path d="M12 2a4 4 0 0 1 4 4c0 3-4 6-4 6s-4-3-4-6a4 4 0 0 1 4-4z" />
      <path d="M12 12v10" />
      <circle cx="12" cy="6" r="1.5" fill="currentColor" />
    </g>

    <g v-else-if="name === 'mercenary' || name === 'mug' || name === 'Наемник из таверны'">
      <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M5 8h12v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z" />
      <path d="M6 4h10M6 8V4M16 8V4" />
    </g>

    <!-- Дефолтная алхимическая искра -->
    <g v-else>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </g>
  </svg>
</template>

<style scoped>
.alchemy-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
