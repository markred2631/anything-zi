"use client"

import { useCallback, useEffect, useState } from "react"
import { MenuGroup, MenuOption, User } from "./types"
import { fetchMenuGroups, fetchUser } from "./fetchers"

export function useUser() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUser().then((fetchedUser: User) => setUser(fetchedUser))
  }, [])

  return { user }
}

export function useMenuGroups() {
  const [menuGroups, setMenuGroups] = useState<MenuGroup[]>([])

  useEffect(() => {
    fetchMenuGroups().then((fetchedMenuGroups: MenuGroup[]) =>
      setMenuGroups(fetchedMenuGroups)
    )
  }, [])

  const toggleOption = useCallback(
    (targetGroup: MenuGroup, targetOption: MenuOption) => {
      setMenuGroups((groups) => {
        // 1) Count total active options across all groups
        const totalActive = groups.reduce((sum, grp) => {
          return sum + grp.options.filter((o) => o.active).length
        }, 0)

        // 2) Look up whether the clicked option is currently active
        const isCurrentlyActive = groups
          .find((g) => g.name === targetGroup.name)
          ?.options.find((o) => o.name === targetOption.name)
          ?.active

        // 3) If it's the last active option AND we're trying to deactivate it, do nothing
        if (isCurrentlyActive && totalActive === 1) {
          return groups
        }

        // 4) Otherwise, toggle as usual
        return groups.map((group) => {
          if (group.name !== targetGroup.name) return group
          return {
            ...group,
            options: group.options.map((opt) =>
              opt.name !== targetOption.name
                ? opt
                : { ...opt, active: !opt.active }
            ),
          }
        })
      })
    },
    [menuGroups]
  )

  const setOptionCount = useCallback(
    (
      targetGroup: MenuGroup,
      targetOption: MenuOption,
      count: number | undefined
    ) => {
      setMenuGroups((groups) =>
        groups.map((group) => {
          if (group.name !== targetGroup.name) return group
          return {
            ...group,
            options: group.options.map((opt) =>
              opt.name !== targetOption.name
                ? opt
                : { ...opt, count: count }
            ),
          }
        })
      )
    },
    []
  )

  const disableAllOtherOptions = useCallback(
    (targetGroup: MenuGroup, targetOption: MenuOption) => {
      setMenuGroups((groups) =>
        groups.map((group) => ({
          ...group,
          options: group.options.map((opt) =>
            // only the clicked option stays active; everything else is turned off
            group.name === targetGroup.name && opt.name === targetOption.name
              ? { ...opt, active: true }
              : { ...opt, active: false }
          ),
        }))
      )
    },
    []
  )

  const setLoading = useCallback(
    (
      targetGroup: MenuGroup,
      targetOption: MenuOption,
      isLoading: boolean
    ) => {
      setMenuGroups((groups) =>
        groups.map((group) => {
          if (group.name !== targetGroup.name) return group
          return {
            ...group,
            options: group.options.map((opt) =>
              opt.name !== targetOption.name
                ? opt
                : { ...opt, loading: isLoading }
            ),
          }
        })
      )
    },
    []
  )

  const setErrMsg = useCallback(
    (
      targetGroup: MenuGroup,
      targetOption: MenuOption,
      errorMsg: string
    ) => {
      setMenuGroups((groups) =>
        groups.map((group) => {
          if (group.name !== targetGroup.name) return group
          return {
            ...group,
            options: group.options.map((opt) =>
              opt.name !== targetOption.name
                ? opt
                : { ...opt, errorMsg: errorMsg }
            ),
          }
        })
      )
    },
    []
  )

  return { menuGroups, toggleOption, setOptionCount, disableAllOtherOptions, setLoading, setErrMsg }
}